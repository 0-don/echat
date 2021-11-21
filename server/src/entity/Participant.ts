import { Lazy } from '../utils';
import { ObjectType, Field, Int } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './User';
import { Room } from './Room';

@ObjectType()
@Entity()
@Unique(['roomId', 'userId'])
export class Participant extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  roomId: number;

  // ROOM
  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.participants, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader()
  room: Lazy<Room>;

  @Field(() => Int)
  @Column()
  userId: number;

  // USER
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.participants, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader()
  user: Lazy<User>;
}
