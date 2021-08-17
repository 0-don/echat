import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('timestamptz')
  from: Date;

  @Field()
  @Column('timestamptz')
  to: Date;

  @Field()
  @Column()
  available: boolean;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.schedules, { onDelete: 'CASCADE' })
  user: User;
}
