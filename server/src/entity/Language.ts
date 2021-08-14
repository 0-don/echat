import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Language extends BaseEntity {

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
  @ManyToOne(() => User, (user) => user.languages, { onDelete: 'CASCADE' })
  user: User;

}
