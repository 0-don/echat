import { Order } from '../entity/Order';
import { MyContext } from '../utils/types/MyContext';
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entity/User';
import { UserService } from '../entity/UserService';
import { FieldError } from '../utils/types/UserTypes';
import { getConnection } from 'typeorm';

@ObjectType()
export class createOrderResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  success: boolean;
}

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  async getBuyerOrders(@Ctx() { req }: MyContext) {
    const buyerId: number = req.session.userId;
    return Order.find({ where: { buyerId } });
  }

  @Query(() => [Order])
  async getSellerOrders(@Ctx() { req }: MyContext) {
    const sellerId: number = req.session.userId;
    return Order.find({ where: { sellerId } });
  }

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
    sellerId === buyerId &&
      errors.push({ field: 'seller', message: 'Cant buy your own service' });

    if (!userService || !buyer || errors.length) {
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

  @Mutation(() => Boolean)
  async completeOrder(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const sellerId: number = req.session.userId;

    try {
      const { raw } = await getConnection()
        .createQueryBuilder()
        .update(Order)
        .set({ status: 'completed' })
        .where('id = :id AND sellerId = :sellerId AND status = :status', {
          id,
          sellerId,
          status: 'started',
        })
        .returning('*')
        .execute();

      const order: Order = raw[0];

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ coins: () => `coins + ${order.finalPrice}` })
        .where('id = :id', { id: sellerId })
        .execute();

      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async acceptOrder(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const sellerId: number = req.session.userId;

    try {
      await Order.update(
        { id, sellerId, status: 'pending' },
        { status: 'started' }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async cancelOrder(
    @Ctx() { req }: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('buyerId', () => Int, { nullable: true }) buyerId?: number,
    @Arg('sellerId', () => Int, { nullable: true }) sellerId?: number
  ) {
    try {
      const { raw } = await getConnection()
        .createQueryBuilder()
        .update(Order)
        .set({ status: 'cancelled' })
        .where('id = :id AND buyerId = :buyerId AND sellerId = :sellerId', {
          id,
          buyerId: buyerId ?? (req.session.userId as number),
          sellerId: sellerId ?? (req.session.userId as number),
        })
        .returning('*')
        .execute();

      const order: Order = raw[0];

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ coins: () => `coins + ${order.finalPrice}` })
        .where('id = :id', { id: buyerId ?? (req.session.userId as number) })
        .execute();

      return true;
    } catch (error) {
      return false;
    }
  }

  // @Query(() => [Language], { nullable: true })
  // getLanguages(@Arg('slug', { nullable: true }) slug?: string) {
  //   return;
  // }
}
