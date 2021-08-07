import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { UserGame } from '../entity/UserGame';
import { MyContext } from '../utils/types/MyContext';
import { isAuth } from '../middleware/isAuth';

@InputType()
export class UpsertUserGame {
  @Field()
  gameId: number;
  @Field()
  level: string;
  @Field()
  platforms: string;
  @Field()
  description: string;
  @Field()
  price: number;
  @Field()
  per: string;
  @Field()
  userId: number;
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

    let userGame;
    userGame = await UserGame.find({ gameId: options.gameId, userId });
    if (!userGame) {
      userGame = UserGame.create({ ...options, userId });
    } else {
      userGame = UserGame.update({gameId: options.gameId, userId},{ ...options });
    }

    return userGame
  }
}
