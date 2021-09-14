import { Field, Int, ObjectType } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceImage } from './ServiceImage';
import { UserService } from './UserService';
import { TypeormLoader } from 'type-graphql-dataloader';

export type List = {
  id: number;
  name: string;
};

@ObjectType()
@Entity()
export class Service extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  type: 'Games' | 'Interactive Entertaiment' | 'More Lifestyles' | string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  igdbId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  twitchId?: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field(() => Int)
  @Column()
  popularity: number;

  @Field()
  @Column()
  boxArtUrl: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  first_release_date?: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  platforms?: List[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  genres?: List[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  multiplayer_modes?: string[];

  // ServiceImage
  @Field(() => [ServiceImage], { nullable: true })
  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.service, {
    cascade: true,
  })
  @TypeormLoader((serviceImage: ServiceImage) => serviceImage.serviceId, {
    selfKey: true,
  })
  images: ServiceImage[];

  // UserService
  @Field(() => UserService, { nullable: true })
  @OneToMany(() => UserService, (userService) => userService.service, {
    cascade: true,
  })
  @TypeormLoader()
  userService: UserService;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
