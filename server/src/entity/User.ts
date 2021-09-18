import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Image } from './Image';
import { Schedule } from './Schedule';
import { Language } from './Language';
import { UserService } from './UserService';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Country } from './Country';
import { UserLanguage } from './UserLanguage';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: false })
  fake: boolean;
  
  @Field(() => String, { nullable: true })
  @Column({ default: 'guest', nullable: true })
  type: 'guest' | 'user' | string;

  @Field(() => Int)
  @Column({ default: 100 })
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
  images: Image[];

  // UserGame
  @Field(() => [UserService], { nullable: true })
  @OneToMany(() => UserService, (userService) => userService.user)
  @TypeormLoader()
  services: UserService[];

  // UserLanguage
  @Field(() => [UserLanguage], { nullable: true })
  @OneToMany(() => UserLanguage, (language) => language.user)
  @TypeormLoader()
  languages: Language[];

  // Schedule
  @Field(() => [Schedule], { nullable: true })
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  @TypeormLoader()
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  resetToken: string;
}
