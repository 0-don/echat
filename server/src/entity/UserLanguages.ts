import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class UserLanguages extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'userId' })
  userId: User;

}
