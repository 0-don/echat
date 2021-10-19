import { Lazy } from '../utils';
import { ObjectType, Field, Int } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Participant } from './Participant';

@ObjectType()
@Entity()
export class Room extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  channel: string;

  // MESSAGE
  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.room, {
    lazy: true,
    nullable: true,
  })
  @TypeormLoader()
  messages?: Lazy<Message[] | null>;

  // PARTICIPANT
  @Field(() => [Participant], { nullable: true })
  @OneToMany(() => Participant, (participant) => participant.room, {
    lazy: true,
    nullable: true,
  })
  @TypeormLoader()
  participants?: Lazy<Participant[] | null>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
