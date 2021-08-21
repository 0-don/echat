import { Service } from '../entity/Service';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { MyContext } from 'src/utils/types/MyContext';
import { ServiceImage } from '../entity/ServiceImage';
import { getRepository } from 'typeorm';

@Resolver(Service)
export class ServiceResolver {
  @FieldResolver(() => [ServiceImage], { nullable: true })
  images(@Root() service: Service, @Ctx() { serviceImageLoader }: MyContext) {
    // console.log(service)
    return serviceImageLoader.load({ serviceId: service.id });
  }

  @Query(() => [Service], { nullable: true })
  getAllServices() {
    return Service.find({
      order: { popularity: 'ASC' },
    });
  }

  @Query(() => [Service], { nullable: true })
  async findService(@Arg('service') service: string) {
    service;
    const foundService = await getRepository(Service)
      .createQueryBuilder('service')
      .where('service.platforms @> :platforms', {
        platforms: JSON.stringify(['PC', 'Mac']),
      })
      // .where(`platforms @> '["PC", "Mac"]'`)
      .getMany();

    return foundService;
  }
}
