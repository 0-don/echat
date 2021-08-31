import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column({ unique: true, nullable: true })
  publicId: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  @TypeormLoader()
  user: User;
}
