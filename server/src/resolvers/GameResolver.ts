import { Game } from '../entity/Game';
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { MyContext } from 'src/utils/types/MyContext';
import { GameImage } from '../entity/GameImage';

@Resolver(Game)
export class GameResolver {

  @FieldResolver(() => [GameImage], { nullable: true })
  images(@Root() game: Game, @Ctx() { gameImageLoader }: MyContext) {
    return gameImageLoader.load({ gameId: game.id });
  }

  @Query(() => [Game], { nullable: true })
  getAllGames() {
    return Game.find({
      order: { popularity: 'ASC' },
    });
  }
}
