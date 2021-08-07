import GraphQLJSON from 'graphql-type-json';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class UserGame extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  gameId: number;

  @Field()
  @Column()
  level: string;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb' })
  platforms: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  per: string;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.games)
  user: User;
}
