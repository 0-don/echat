import { Game } from '../entity/Game';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { MyContext } from 'src/utils/types/MyContext';
import { GameImage } from '../entity/GameImage';
import { getRepository } from 'typeorm';

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

  @Query(() => [Game], { nullable: true })
  async findGame(@Arg('game') game: string) {

    game
    const foundGame = await getRepository(Game)
      .createQueryBuilder('game')
      .where('game.platforms @> :platforms', { platforms: JSON.stringify(['PC', "Mac"]) })
      // .where(`platforms @> '["PC", "Mac"]'`)
      .getMany();

    return foundGame;
  }
}
