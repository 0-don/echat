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
import { GameImage } from './GameImage';

@ObjectType()
@Entity()
export class Game extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

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
  platforms?: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  genres?: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  multiplayer_modes?: string[];

  // GameImage
  @OneToMany(() => GameImage, (gameImage) => gameImage.game, {
    cascade: true,
  })
  @Field(() => [GameImage], { nullable: true })
  images: GameImage[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
