import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Service } from './Service';

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
  @ManyToOne(() => Service, (service) => service.images)
  service: Service;
}
