import { Field, Float, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { UserService } from './UserService';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: 'pending' })
  status: 'cancelled' | 'pending' | 'started' | 'completed' | string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Int)
  @Column()
  rounds: number;

  @Field()
  @Column()
  per: string;

  @Field()
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Field(() => Float)
  @Column({ type: 'float' })
  finalPrice: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.buyerOrder, {
    lazy: true,
    nullable: true,
  })
  @TypeormLoader(() => User, (order: Order) => order.buyerId)
  buyer: Promise<User>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.buyer)
  buyerId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.sellerOrder, {
    lazy: true,
    nullable: true,
  })
  @TypeormLoader(() => User, (order: Order) => order.sellerId)
  seller: Promise<User>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.seller)
  sellerId: number;

  @Field(() => UserService, { nullable: true })
  @ManyToOne(() => UserService, (userService) => userService.orders, {
    lazy: true,
    nullable: true,
  })
  @TypeormLoader(() => User, (order: Order) => order.userServiceId)
  userService: Promise<UserService>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.userService)
  userServiceId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
