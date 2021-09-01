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
import { groupBy } from 'lodash';
import { ServiceImage } from '../entity/ServiceImage';
import { Loader } from 'type-graphql-dataloader';
import { getRepository, In } from 'typeorm';
import DataLoader from 'dataloader';

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
  @FieldResolver()
  @Loader<number, ServiceImage[]>(async (serviceIds) => {
    const serviceImages = await getRepository(ServiceImage).find({
      where: { serviceId: In([...serviceIds]) },
    });
    const serviceImageByserviceId = groupBy(serviceImages, 'serviceId');
    return serviceIds.map(
      (serviceId) => serviceImageByserviceId[serviceId] ?? []
    );
  })
  images(@Root() root: UserService) {
    return (dataloader: DataLoader<number, ServiceImage[]>) =>
      dataloader.load(root.serviceId);
  }

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
