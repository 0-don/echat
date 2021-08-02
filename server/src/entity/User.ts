import { Field, InputType, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Image } from './Image';
import { Schedule } from './Schedule';
import { UserLanguage } from './UserLanguage';

@ObjectType()
@InputType('UserInput')
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

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

  // UserLanguage
  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user, {
    cascade: true,
  })
  @Field(() => [UserLanguage], { nullable: true })
  languages: UserLanguage[];

  // Image
  @OneToMany(() => Image, (image) => image.user, {
    cascade: true,
  })
  @Field(() => [Image], { nullable: true })
  images: Image[];

  // Schedule
  @OneToMany(() => Schedule, (schedule) => schedule.user, {
    cascade: true,
  })
  @Field(() => [Schedule], { nullable: true })
  schedules: Schedule[];

  @Column({ nullable: true })
  resetToken: string;
}
