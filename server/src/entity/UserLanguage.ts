import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class UserLanguage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  gid: number;

  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.languages)
  user: User;

}
