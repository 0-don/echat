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
import { UserGame } from '../entity/UserGame';
import { MyContext } from '../utils/types/MyContext';
import { isAuth } from '../middleware/isAuth';
import { Game } from '../entity/Game';

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
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int)
  price: number;
  @Field()
  per: string;
}

@Resolver(UserGame)
export class UserGameResolver {
  @FieldResolver(() => Game)
  game(@Root() userGame: UserGame, @Ctx() { gameLoader }: MyContext) {
    return gameLoader.load(userGame.gameId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async switchUserGameStatus(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const userGame = await UserGame.findOne({ id, userId });
    await UserGame.update({ id, userId }, { status: !userGame?.status });
    return true;
  }

  @Query(() => [UserGame], { nullable: true })
  @UseMiddleware(isAuth)
  getUserGame(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    return UserGame.find(userId);
  }

  @Mutation(() => Boolean)
  async upsertUserGame(
    @Arg('options') options: UpsertUserGame,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    let userGame = await UserGame.findOne({ gameId: options.gameId, userId });

    if (!userGame) {
      await UserGame.create({ ...options, userId }).save();
    } else {
      await UserGame.update({ gameId: options.gameId, userId }, { ...options });
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUserGame(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await UserGame.delete({ id, userId });

    return true;
  }
}
