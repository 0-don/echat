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

type List = {
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

  @Field(() => Int)
  @Column({ unique: true })
  igdbId: number;

  @Field(() => Int)
  @Column({ unique: true })
  twitchId: number;

  @Field()
  @Column()
  name: string;

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
  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.service, {
    cascade: true,
  })
  @Field(() => [ServiceImage], { nullable: true })
  images: ServiceImage[];

  // UserService
  @OneToMany(() => UserService, (userService) => userService.service, {
    cascade: true,
  })
  @Field(() => UserService, { nullable: true })
  userService: UserService;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
