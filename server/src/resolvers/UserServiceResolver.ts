import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { UserService } from '../entity/UserService';
import { MyContext } from '../utils/types/MyContext';
import { isAuth } from '../middleware/isAuth';
import { getRepository } from 'typeorm';
import { Service } from '../entity/Service';
import { ListValues } from '../utils/types/UserTypes';
// import { UserLanguage } from '../entity/UserLanguage';
import { Between } from 'typeorm';
import { addYears, subYears } from 'date-fns';
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
  @Field()
  price: number;
  @Field()
  per: string;
}

@ObjectType()
class PaginatedUserService {
  @Field(() => [UserService])
  userService: UserService[];
  @Field()
  hasMore: boolean;
}

@InputType()
class FilterOptions {
  @Field(() => [ListValues], { nullable: true })
  countries?: ListValues[];
  @Field(() => [ListValues], { nullable: true })
  genders?: ListValues[];
  @Field(() => [ListValues], { nullable: true })
  ages?: ListValues[];
  @Field(() => [ListValues], { nullable: true })
  prices?: ListValues[];
}

export const betweenDates = (from: number, to: number) => [
  subYears(new Date(), to),
  subYears(new Date(), from),
];
export const BeforeDate = (date: Date) => Between(subYears(date, 100), date);

@Resolver(UserService)
export class UserServiceResolver {
  // @FieldResolver()
  // @Loader<number, ServiceImage[]>(async (serviceIds) => {
  //   const serviceImages = await getRepository(ServiceImage).find({
  //     where: { serviceId: In([...serviceIds]) },
  //   });
  //   const serviceImageByserviceId = groupBy(serviceImages, 'serviceId');
  //   return serviceIds.map(
  //     (serviceId) => serviceImageByserviceId[serviceId] ?? []
  //   );
  // })
  // images(@Root() root: UserService) {
  //   return (dataloader: DataLoader<number, ServiceImage[]>) =>
  //     dataloader.load(root.serviceId);
  // }

  @Query(() => PaginatedUserService, { nullable: true })
  async filterUserService(
    @Arg('slug') slug: string,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor?: string | null,
    @Arg('filterOptions', () => FilterOptions, { nullable: true })
    filterOptions?: FilterOptions | null
  ) {
    if (!slug || !limit) {
      return null;
    }

    console.log(slug, limit, cursor, filterOptions);
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const { id } = (await Service.findOne({ slug })) as Service;

    const qb = getRepository(UserService).createQueryBuilder('userService');

    if (filterOptions?.countries?.length) {
      let countriesIds = filterOptions.countries.map(({ id }) => id);
      qb.leftJoinAndSelect('userService.user', 'user').andWhere(
        'user.countryId IN (:...countriesIds)',
        { countriesIds }
      );
    }

    if (filterOptions?.genders?.length) {
      let gendersNames = filterOptions.genders.map(({ name }) => name);
      qb.leftJoinAndSelect('userService.user', 'user').andWhere(
        'user.gender IN (:...gendersNames)',
        { gendersNames }
      );
    }

   
    if (filterOptions?.ages?.length) {
      let [from, to] = betweenDates(18, 25)
      if (filterOptions.ages.find((age) => age.name === '18-25')) {
        qb.leftJoinAndSelect('userService.user', 'user').andWhere(
          'user.age BETWEEN :from AND :to',
          { from, to }
        );
      }

      [from, to] = betweenDates(26, 30)
      if (filterOptions.ages.find((age) => age.name === '26-30')) {
        qb.leftJoinAndSelect('userService.user', 'user').andWhere(
          'user.age BETWEEN :from AND :to',
          { from, to }
        );
      }

      [from, to] = betweenDates(30, 99)
      if (filterOptions.ages.find((age) => age.name === '30+')) {
        qb.leftJoinAndSelect('userService.user', 'user').andWhere(
          'user.age BETWEEN :from AND :to',
          { from, to }
        );
      }
    }

    qb.andWhere('userService.serviceId = :id', { id });

    if (cursor) {
      qb.andWhere('userService.createdAt < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const userService = await qb
      .orderBy('userService.createdAt', 'DESC')
      .limit(reaLimitPlusOne)
      .getMany();

    return {
      userService: userService.slice(0, realLimit),
      hasMore: userService.length === reaLimitPlusOne,
    };
  }

  @Query(() => [UserService], { nullable: true })
  @UseMiddleware(isAuth)
  getMeUserService(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return UserService.find({ order: { serviceId: 'ASC' }, where: { userId } });
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
