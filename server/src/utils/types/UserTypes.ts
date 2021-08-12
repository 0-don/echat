import { User } from '../../entity/User';
import { InputType, Field, ObjectType, Int } from 'type-graphql';

@InputType()
export class EmailUsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UpdatedUser {
  @Field()
  username: string;
  @Field()
  description: string;
  @Field()
  age: Date;
  @Field()
  gender: string;
  @Field()
  country: string;
  @Field()
  discord: string;
  @Field()
  twitter: string;
  @Field()
  facebook: string;
  @Field()
  snapchat: string;
  @Field()
  instagram: string;
  @Field()
  twitch: string;
  @Field()
  steam: string;
  @Field()
  tiktok: string;
  @Field(() => [UpdatedUserValues])
  languages: UpdatedUserValues[];
  @Field(() => [UpdatedUserValues])
  schedules: UpdatedUserValues[];
}
// { id: 7, name: 'Sunday', from: 0, to: 23, available: false },
@InputType()
export class UpdatedUserValues {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  available?: boolean;
}
