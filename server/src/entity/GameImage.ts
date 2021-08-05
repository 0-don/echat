import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Game } from './Game';

@ObjectType()
@Entity()
export class GameImage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @PrimaryColumn()
  type: string;

  @Field()
  @PrimaryColumn()
  url: string;

  @Field(() => Int)
  @Column()
  width: number;

  @Field(() => Int)
  @Column()
  height: number;

  @Field()
  @Column()
  gameId: number;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.images)
  user: Game;
}
