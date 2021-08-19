import GraphQLJSON from 'graphql-type-json';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Game } from './Game';
import { User } from './User';

@ObjectType()
@Entity()
export class UserGame extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Boolean)
  @Column({ default: true })
  status: boolean;

  @Field()
  @Column()
  level: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  platforms: { id: number; name: string }[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  per: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Int)
  @Column()
  gameId: number;

  @Field(() => Game)
  @ManyToOne(() => Game, (user) => user.userGame)
  game: Game;
}
