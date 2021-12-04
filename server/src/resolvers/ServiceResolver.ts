import { Service } from '../entity/Service';
import { Arg, Int, Query, Resolver } from 'type-graphql';

@Resolver(Service)
export class ServiceResolver {
  @Query(() => [Service], { nullable: true })
  getServices() {
    return Service.find({
      order: { popularity: 'ASC' },
    });
  }

  @Query(() => Service, { nullable: true })
  async getService(@Arg('id', () => Int) id: number) {
    // const foundService = await getRepository(Service)
    //   .createQueryBuilder('service')
    //   .where('service.platforms @> :platforms', {
    //     platforms: JSON.stringify(['PC', 'Mac']),
    //   })
    //   // .where(`platforms @> '["PC", "Mac"]'`)
    //   .getMany();

    return Service.findOne(id);
  }
}
