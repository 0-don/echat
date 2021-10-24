import { Lazy } from '../utils';
import { ObjectType, Field, Int } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  message: string;

  @Field(() => Int)
  @Column()
  roomId: number;

  @Field()
  @Column({ default: false })
  read: boolean;

  // ROOM
  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.messages, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader()
  room: Lazy<Room | null>;

  @Field(() => Int)
  @Column()
  userId: number;

  // USER
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages, {
    lazy: true,
  })
  @TypeormLoader()
  user: Lazy<User>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
