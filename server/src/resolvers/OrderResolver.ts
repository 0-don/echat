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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@ObjectType()
export class OrderResponse {
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

  @Mutation(() => OrderResponse)
  async createOrder(
    @Arg('userServiceId', () => Int) userServiceId: number,
    @Arg('rounds', () => Int) rounds: number,
    @Arg('startTime') startTime: Date,
    @Ctx() { req }: MyContext
  ): Promise<OrderResponse> {
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

  @Mutation(() => OrderResponse)
  async completeOrder(
    @Ctx() { req }: MyContext,
    @Arg('id', () => Int) id: number,
    @Arg('buyerId', () => Int, { nullable: true }) buyerId?: number,
    @Arg('sellerId', () => Int, { nullable: true }) sellerId?: number
  ) {
    const order = await Order.findOne({
      id,
      buyerId: buyerId ?? (req.session.userId as number),
      sellerId: sellerId ?? (req.session.userId as number),
    });

    console.log(dayjs(new Date()).diff(order?.startedTime, 'hours'));
    const errors: FieldError[] = [];

    !order && errors.push({ field: 'order', message: 'Order is missing' });

    order?.status === 'completed' &&
      errors.push({ field: 'order', message: 'Order already completed' });

    dayjs(new Date()).diff(order?.startedTime, 'minutes') < 15 &&
      errors.push({
        field: 'order',
        message: 'Wait 15 minutes before completing the Order',
      });

    dayjs(new Date()).diff(order?.startedTime, 'hours') < 24 &&
      order?.sellerId === (req.session.userId as number) &&
      errors.push({
        field: 'order',
        message: 'Wait 24 Hours or ask the Client to finish the Order',
      });

    if (!order || errors.length) {
      return { success: false, errors };
    }

    await Order.update({ id: order.id }, { status: 'completed' });

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ coins: () => `coins + ${order?.finalPrice}` })
        .where('id = :id', { id: sellerId })
        .execute();

      return { success: true, errors };
    } catch (error) {
      errors.push({ field: 'user', message: 'User not Found' });
      return { success: false, errors };
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
        { status: 'started', startedTime: new Date() }
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
        .where(
          'id = :id AND buyerId = :buyerId AND sellerId = :sellerId AND status <> :status',
          {
            id,
            buyerId: buyerId ?? (req.session.userId as number),
            sellerId: sellerId ?? (req.session.userId as number),
            status: 'cancelled',
          }
        )
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
