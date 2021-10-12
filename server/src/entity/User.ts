import { Field, Float, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Image } from './Image';
import { Schedule } from './Schedule';
import { Language } from './Language';
import { UserService } from './UserService';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Country } from './Country';
import { UserLanguage } from './UserLanguage';
import { Order } from './Order';
import { Review } from './Review';
import { Lazy } from '../utils';
import { Message } from './Message';
import { Participant } from './Participant';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true, default: false })
  fake: boolean;

  @Field(() => String, { nullable: true })
  @Column({ default: 'guest', nullable: true })
  type: 'guest' | 'user' | string;

  @Field(() => Float)
  @Column({ type: 'float', default: 100 })
  coins: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  lastOnline: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  age: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  discord: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  snapchat: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  instagram: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitch: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  steam: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tiktok: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  countryId: number;

  // Country
  @Field(() => Country, { nullable: true })
  @ManyToOne(() => Country, {
    nullable: true,
    lazy: true,
  })
  @TypeormLoader(() => Country, (user: User) => user.countryId)
  country: Promise<Country | null>;

  // Image
  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.user)
  @TypeormLoader()
  images?: Image[];

  // UserGame
  @Field(() => [UserService], { nullable: true })
  @OneToMany(() => UserService, (userService) => userService.user)
  @TypeormLoader()
  services?: UserService[];

  // UserLanguage
  @Field(() => [UserLanguage], { nullable: true })
  @OneToMany(() => UserLanguage, (language) => language.user)
  @TypeormLoader()
  languages?: Language[];

  // Schedule
  @Field(() => [Schedule], { nullable: true })
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  @TypeormLoader()
  schedules?: Schedule[];

  // BuyerOrder
  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.buyer, { nullable: true })
  @TypeormLoader()
  buyerOrders?: Order[];

  // SellerOrder
  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.seller, { nullable: true })
  @TypeormLoader()
  sellerOrders?: Order[];

  // Source
  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.source, { nullable: true })
  @TypeormLoader((review: Review) => review.sourceId, { selfKey: true })
  source?: Lazy<Review[]>;

  // Target
  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.target, { nullable: true })
  @TypeormLoader((review: Review) => review.targetId, { selfKey: true })
  target?: Lazy<Review[]>;

  // Messages
  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  @TypeormLoader()
  messages?: Lazy<Message[] | null>;

  // Participants
  @Field(() => [Participant], { nullable: true })
  @OneToMany(() => Participant, (participant) => participant.user, {
    nullable: true,
  })
  @TypeormLoader()
  participants?: Lazy<Participant[] | null>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  resetToken: string;
}
