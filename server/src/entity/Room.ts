import { Lazy } from '../utils';
import { ObjectType, Field, Int } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';

@ObjectType()
@Entity()
export class Room extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  channel: string;

  @Field()
  @Column()
  type: boolean;

  // ROOM
  @Field(() => Message, { nullable: true })
  @OneToMany(() => Message, (message) => message.room, {
    lazy: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @TypeormLoader()
  messages: Lazy<Message | null>;
}
