import GraphQLJSON from 'graphql-type-json';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Service } from './Service';
import { User } from './User';

@ObjectType()
@Entity()
export class UserService extends BaseEntity {
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
  @ManyToOne(() => User, (user) => user.services, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Int)
  @Column()
  serviceId: number;

  @Field(() => Service)
  @ManyToOne(() => Service, (user) => user.userService)
  service: Service;
}
