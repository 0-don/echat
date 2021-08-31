import { Service } from '../entity/Service';
import { Arg, Query, Resolver } from 'type-graphql';

import { getRepository } from 'typeorm';

@Resolver(Service)
export class ServiceResolver {
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
