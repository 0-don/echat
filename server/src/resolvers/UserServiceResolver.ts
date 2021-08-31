import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
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
  @Field({ nullable: true })
  level?: string;
  @Field(() => [Dropdown], { nullable: true })
  platforms?: [Dropdown];
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int)
  price: number;
  @Field()
  per: string;
}

@Resolver(UserService)
export class UserServiceResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async switchUserServiceStatus(
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
  getMeUserService(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return UserService.find({ order: { serviceId: 'ASC' }, where: { userId } });
  }

  @Query(() => [UserService], { nullable: true })
  async filterUserService(@Arg('slug') slug: string) {
    const service = await Service.findOne({ slug });

    if (!service) {
      return null;
    }
    const userService = await UserService.find({ serviceId: service.id });
    
    return userService;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async upsertUserService(
    @Arg('options') options: UpsertUserService,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    let userService = await UserService.findOne({
      serviceId: options.serviceId,
      userId,
    });

    if (!userService) {
      await UserService.create({ ...options, userId }).save();
    } else {
      await UserService.update(
        { serviceId: options.serviceId, userId },
        { ...options }
      );
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
