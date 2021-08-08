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
import { UserGame } from '../entity/UserGame';
import { MyContext } from '../utils/types/MyContext';
import { isAuth } from '../middleware/isAuth';

@InputType()
export class Dropdown {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@InputType()
export class UpsertUserGame {
  @Field(() => Int)
  gameId: number;
  @Field()
  level: string;
  @Field(() => [Dropdown])
  platforms: [Dropdown];
  @Field()
  description: string;
  @Field(() => Int)
  price: number;
  @Field()
  per: string;
}

@Resolver(UserGame)
export class UserGameResolver {
  @Query(() => [UserGame], { nullable: true })
  @UseMiddleware(isAuth)
  getUserGame(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return UserGame.find(userId);
  }

  @Mutation(() => UserGame)
  async upsertUserGame(
    @Arg('options') options: UpsertUserGame,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    console.log(options);
    let userGame = await UserGame.findOne({ gameId: options.gameId, userId });

    if (!userGame) {
      await UserGame.create({ ...options, userId }).save();
    } else {
      await UserGame.update({ gameId: options.gameId, userId }, { ...options });
    }

    let freshGame = UserGame.find({ gameId: options.gameId, userId });

    return freshGame;
  }
}
