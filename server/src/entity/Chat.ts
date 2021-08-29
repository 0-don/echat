import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Chat {
  @Field()
  id: number;

  @Field()
  message: string;

  @Field()
  name: string;
}
