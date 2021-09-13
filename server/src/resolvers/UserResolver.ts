import { User } from '../entity/User';
import { Session } from '../entity/Session';
import {
  Arg,
  Ctx,
  // FieldResolver,
  Mutation,
  Query,
  Resolver,
  // Root,
  UseMiddleware,
} from 'type-graphql';
import argon2 from 'argon2';
import { getConnection, getRepository } from 'typeorm';
import { MyContext } from '../utils/types/MyContext';
import { COOKIE_NAME } from '../constants';
import { validateRegister } from '../utils/validateRegister';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { log } from 'console';
import { isAuth } from '../middleware/isAuth';
import {
  EmailUsernamePasswordInput,
  UpdatedUser,
  UserResponse,
} from '../utils/types/UserTypes';
import { Schedule } from '../entity/Schedule';
import { UserLanguage } from '../entity/UserLanguage';

@Resolver(User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async getUsers() {
    const users = await getConnection()
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .where('user.type = :type', { type: 'user' })
      .limit(50)
      .execute();
    return users;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    const id: number = req.session.userId;
    if (!id) {
      return null;
    }

    return getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ lastOnline: new Date() })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((response) => response.raw[0]);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async changeUserType(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    await User.update({ id: userId }, { type: 'user' });
    return true;
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async updateMe(
    @Arg('options') options: UpdatedUser,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId as number;
    const { languages, schedules, ...optionsUpdate } = options;

    await User.update({ id: userId }, { ...optionsUpdate });

    if (languages.length) {
      const freshLanguages = languages.map((lang) => ({
        languageId: lang.id,
        userId,
        name: lang.name,
      }));
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(UserLanguage)
        .where('userId = :userId', { userId })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserLanguage)
        .values(freshLanguages)
        .execute();
    }

    if (schedules.length) {
      const freshSchedules = schedules.map((sched) => ({ ...sched, userId }));

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Schedule)
        .where('userId = :userId', { userId })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Schedule)
        .values(freshSchedules)
        .execute();
    }

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: EmailUsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const { email, username, password } = options;
    const hashedPassword = await argon2.hash(password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: username,
          email: email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();

      user = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          { field: 'usernameOrEmail', message: "that username doesn't exist" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'incorrect password' }],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    const sessions = await getRepository(Session)
      .createQueryBuilder('session')
      .select('session.sid')
      .where('session.sess ::jsonb @> :sess', {
        sess: { userId: req.session.userId },
      })
      .getRawMany();

    const { session_sid } = sessions.find(
      ({ session_sid }) => req.cookies[COOKIE_NAME].indexOf(session_sid) > 0
    );

    await Session.delete({ sid: session_sid });

    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the db
      return true;
    }

    user.resetToken = v4();
    await user.save();

    const html = `<a href="${process.env.CORS_ORIGIN}/change-password/${user.resetToken}">reset password</a>`;

    sendEmail('Password Reset', email, html);
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      };
    }

    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    user.resetToken = '';
    await user.save();

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
