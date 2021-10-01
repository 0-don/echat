import { Field, Float, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Order } from './Order';
import { User } from './User';

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  score: number;

  @Field()
  @Column()
  recommend: boolean;

  @Field()
  @Column()
  review: string;

  // TARGET
  @Field(() => User)
  @OneToOne(() => User, (user) => user.target, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => User, (review: Review) => review.targetId)
  target: Promise<User>;

  // TARGETID
  @Field(() => Int)
  @Column()
  @RelationId((review: Review) => review.target)
  targetId: number;

  // SOURCE
  @Field(() => User)
  @OneToOne(() => User, (user) => user.source, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => User, (review: Review) => review.sourceId)
  source: Promise<User>;

  // SOURCEID
  @Field(() => Int)
  @Column()
  @RelationId((review: Review) => review.source)
  sourceId: number;

  // ORDER
  @Field(() => Order)
  @OneToOne(() => Order, (order) => order.review, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => Order, (review: Review) => review.orderId)
  order: Promise<Order>;

  // ORDERID
  @Field(() => Int)
  @Column()
  @RelationId((review: Review) => review.order)
  orderId: number;

  @CreateDateColumn()
  created_at: Date;
}
