import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isoAlpha2: string;

  @Field()
  @Column()
  isoAlpha3: string;

  @Field(() => Int)
  @Column()
  isoNumeric: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currencycode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currencyname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currencysymbol: string;

  @Field()
  @Column()
  flag: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.country, { lazy: true, nullable: true })
  @TypeormLoader(() => User, (user: User) => user.id)
  user: Promise<User| null>;
}
