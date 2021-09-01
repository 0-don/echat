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
} from 'typeorm';
import { Service } from './Service';
import { ServiceImage } from './ServiceImage';
import { User } from './User';

@ObjectType()
@Entity()
export class UserService extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Boolean)
  @Column({ default: true })
  status: boolean;

  @Field()
  @Column()
  level: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  platforms: { id: number; name: string }[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  per: string;

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

  @Field(() => Service)
  @ManyToOne(() => Service, (user) => user.userService, { onDelete: 'CASCADE' })
  @TypeormLoader()
  service: Service;

  // ServiceImage
  @Field(() => [ServiceImage], { nullable: true })
  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.userService)
  // @JoinColumn({ name: 'serviceId', referencedColumnName: 'serviceId' })
  @TypeormLoader()
  images: ServiceImage[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
