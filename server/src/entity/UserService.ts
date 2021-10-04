import GraphQLJSON from 'graphql-type-json';
import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Order } from './Order';
import { Review } from './Review';
import { Service } from './Service';
import { ServiceImage } from './ServiceImage';
import { User } from './User';

@ObjectType()
@Entity()
@Unique(['userId', 'serviceId'])
export class UserService extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Boolean)
  @Column({ default: true })
  status: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  level?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  platforms?: { id: number; name: string }[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ type: 'float', default: 0 })
  price: number;

  @Field()
  @Column()
  per: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.services, { onDelete: 'CASCADE' })
  @TypeormLoader()
  user: User;

  @Field(() => Int)
  @Column()
  serviceId: number;

  // Service
  @Field(() => Service)
  @ManyToOne(() => Service, (user) => user.userService)
  @TypeormLoader()
  service: Service;

  // ServiceImage
  @Field(() => [ServiceImage], { nullable: true })
  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.userService)
  @TypeormLoader()
  images: ServiceImage[];

  // Orders
  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.userService)
  @TypeormLoader()
  orders: Order[];

  // Reviews
  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.userService)
  @TypeormLoader()
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
