import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Images extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ unique: true })
  url: string;

  @Field()
  @Column({ unique: true, nullable: true })
  publicId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'userId' })
  userId: User;
}
