import { Field, Float, Int, ObjectType } from 'type-graphql';

import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: 'open' })
  status: 'open' | 'closed' | string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Int)
  @Column()
  rounds: number;

  @Field()
  @Column()
  per: string;

  @Field(() => String)
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Field(() => Float)
  @Column({ type: 'float' })
  finalPrice: number;

  @Field(() => Int)
  @Column()
  buyerId: number;

  @Field(() => Int)
  @Column()
  sellerId: number;

  @Field(() => Int)
  @Column()
  userServiceId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @Field(() => User, { nullable: true })
  // @OneToOne(() => User, (user) => user.country, { lazy: true, nullable: true })
  // @TypeormLoader(() => User, (user: User) => user.id)
  // user: Promise<User| null>;
}
