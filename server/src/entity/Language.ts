import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Language extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  code: string;
}
