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
} from "type-graphql";
import { UserService } from "../entity/UserService";
import { MyContext } from "../utils/types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { getRepository } from "typeorm";
import { Service } from "../entity/Service";
import { ListValues } from "../utils/types/UserTypes";
import { subYears } from "date-fns";
import { UserLanguage } from "../entity/UserLanguage";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { fileUpload } from "../utils/fileUpload";

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
  image?: string;
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
  languages?: ListValues[];
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
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async changeUserserviceImage(
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<string> {
    const imagesList: { url: string }[] = [];
    for (let file of files) {
      const res = await fileUpload(file);
      imagesList.push({
        url: res.secure_url,
      });
    }

    return imagesList[0].url;
  }

  @Query(() => PaginatedUserService, { nullable: true })
  async filterUserService(
    @Arg("slug") slug: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string | null,
    @Arg("filterOptions", () => FilterOptions, { nullable: true })
    filterOptions?: FilterOptions | null
  ) {
    if (!slug || !limit) {
      return null;
    }

    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const { id } = (await Service.findOne({ slug })) as Service;
    console.log(
      slug,
      id,
      limit,
      cursor,
      new Date(parseInt(cursor || "")),
      filterOptions
    );
    const qb = getRepository(UserService)
      .createQueryBuilder("userService")
      .leftJoinAndSelect("userService.user", "user");

    if (filterOptions?.languages?.length) {
      let languagesIds = filterOptions.languages.map(({ id }) => id);
      qb.leftJoinAndSelect(
        UserLanguage,
        "userLanguage",
        "userLanguage.userId = userService.userId"
      ).andWhere("userLanguage.languageId IN (:...languagesIds)", {
        languagesIds,
      });
    }

    if (filterOptions?.genders?.length) {
      let gendersNames = filterOptions.genders.map(({ name }) => name);
      qb.andWhere("user.gender IN (:...gendersNames)", { gendersNames });
    }

    if (filterOptions?.ages?.length) {
      let dates: Date[] = [];
      filterOptions.ages.find((age) => age.name === "18-25") &&
        (dates = dates.concat(betweenDates(18, 25)));

      filterOptions.ages.find((age) => age.name === "26-30") &&
        (dates = dates.concat(betweenDates(26, 30)));

      filterOptions.ages.find((age) => age.name === "30+") &&
        (dates = dates.concat(betweenDates(30, 99)));

      const from = new Date(Math.min.apply(null, dates));
      const to = new Date(Math.max.apply(null, dates));
      qb.andWhere("user.age BETWEEN :from AND :to", { from, to });
    }

    if (filterOptions?.prices?.length) {
      let prices: number[] = [];
      filterOptions.prices.find((price) => price.name === "0-5") &&
        (prices = prices.concat([0, 5]));

      filterOptions.prices.find((price) => price.name === "5-10") &&
        (prices = prices.concat([5, 10]));

      filterOptions.prices.find((price) => price.name === "10-20") &&
        (prices = prices.concat([10, 20]));

      filterOptions.prices.find((price) => price.name === "20+") &&
        (prices = prices.concat([20, 99999]));

      const from = Math.min.apply(null, prices);
      const to = Math.max.apply(null, prices);
      qb.andWhere("userService.price BETWEEN :from AND :to", { from, to });
    }

    qb.andWhere("userService.serviceId = :id", { id });

    if (cursor) {
      qb.andWhere("userService.createdAt < :cursor", {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const userService = await qb
      .orderBy("userService.createdAt", "DESC")
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
    return UserService.find({ order: { serviceId: "ASC" }, where: { userId } });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async switchUserServiceStatus(
    @Arg("id", () => Int) id: number,
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
    @Arg("options") options: UpsertUserService,
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
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await UserService.delete({ id, userId });

    return true;
  }
  @Query(() => UserService)
  async getUserServiceById(@Arg("id", () => Int) id: number) {
    const userdata = await UserService.findOne({ id });
    console.log(userdata);
    return userdata;
  }
}
