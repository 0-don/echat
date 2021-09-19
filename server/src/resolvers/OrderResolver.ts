import { Order } from '../entity/Order';
import { MyContext } from '../utils/types/MyContext';
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { User } from '../entity/User';
import { UserService } from '../entity/UserService';
import { FieldError } from '../utils/types/UserTypes';

@ObjectType()
export class createOrderResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  success: boolean;
}

@Resolver()
export class OrderResolver {
  @Mutation(() => createOrderResponse)
  async createOrder(
    @Arg('userServiceId', () => Int) userServiceId: number,
    @Arg('rounds', () => Int) rounds: number,
    @Arg('startTime') startTime: Date,
    @Ctx() { req }: MyContext
  ): Promise<createOrderResponse> {
    const buyerId = req.session.userId;

    const userService = await UserService.findOne({ id: userServiceId });
    const buyer = await User.findOne({ id: buyerId });
    const sellerId = userService?.userId;

    const errors: FieldError[] = [];
    !userService &&
      errors.push({ field: 'userService', message: 'User service missing' });
    !buyer && errors.push({ field: 'buyer', message: 'Buyer is missing' });

    if (!userService || !buyer) {
      return { success: false, errors };
    }

    const finalPrice = rounds * userService.price;
    if (buyer.coins < finalPrice) {
      errors.push({ field: 'coins', message: 'not enough coins' });
      return { success: false, errors };
    }

    await Order.insert({
      userServiceId: userService.id,
      buyerId,
      sellerId,
      rounds,
      finalPrice,
      price: userService.price,
      per: userService.per,
      startTime,
    });

    await User.update({ id: buyerId }, { coins: buyer.coins - finalPrice });

    return { success: true, errors };
  }

  // @Query(() => [Language], { nullable: true })
  // getLanguages(@Arg('slug', { nullable: true }) slug?: string) {
  //   return;
  // }
}
