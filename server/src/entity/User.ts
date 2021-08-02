import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Image } from './Image';
import { UserLanguage } from './UserLanguage';

@ObjectType()
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

  @Field(() => [UserLanguage], { nullable: true })
  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user, {
    cascade: true,
  })
  languages: UserLanguage[];

  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.user, {
    cascade: true,
  })
  images: Image[];

  @Column({ nullable: true })
  resetToken: string;
}
