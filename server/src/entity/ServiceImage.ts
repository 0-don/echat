import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './Service';
import { UserService } from './UserService';

@ObjectType()
@Entity()
export class ServiceImage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Int)
  @Column()
  width: number;

  @Field(() => Int)
  @Column()
  height: number;

  @Field()
  @Column()
  serviceId: number;

  @Field(() => Service)
  @ManyToOne(() => Service, (service) => service.images, {
    onDelete: 'CASCADE',
  })
  @TypeormLoader()
  service: Service;

  @Field(() => UserService)
  @ManyToOne(() => UserService, (userService) => userService.images, {
    onDelete: 'CASCADE',
  })

  @TypeormLoader()
  userService: UserService;
}
