import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { UserService } from '../entity/UserService';
import { MyContext } from '../utils/types/MyContext';
import { isAuth } from '../middleware/isAuth';
import { Service } from '../entity/Service';

@InputType()
export class Dropdown {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@InputType()
export class UpsertUserService {
  @Field(() => Int)
  serviceId: number;
  @Field()
  level: string;
  @Field(() => [Dropdown])
  platforms: [Dropdown];
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int)
  price: number;
  @Field()
  per: string;
}

@Resolver(UserService)
export class UserServiceResolver {
  @FieldResolver(() => Service)
  service(@Root() userService: UserService, @Ctx() { serviceLoader }: MyContext) {
    return serviceLoader.load(userService.serviceId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async switchUserGameStatus(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const userGame = await UserService.findOne({ id, userId });
    await UserService.update({ id, userId }, { status: !userGame?.status });
    return true;
  }

  @Query(() => [UserService], { nullable: true })
  @UseMiddleware(isAuth)
  getUserService(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return UserService.find({ order: { serviceId: 'ASC' }, where: { userId } });
  }

  @Mutation(() => Boolean)
  async upsertUserService(
    @Arg('options') options: UpsertUserService,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    let userService = await UserService.findOne({ serviceId: options.serviceId, userId });

    if (!userService) {
      await UserService.create({ ...options, userId }).save();
    } else {
      await UserService.update({ serviceId: options.serviceId, userId }, { ...options });
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUserService(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await UserService.delete({ id, userId });

    return true;
  }
}
