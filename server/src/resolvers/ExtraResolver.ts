import { Country } from '../entity/Country';
import { Arg, Query, Resolver } from 'type-graphql';
import { Language } from '../entity/Language';
import { Service } from '../entity/Service';
import { UserService } from '../entity/UserService';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserLanguage } from '../entity/UserLanguage';

@Resolver()
export class ExtraResolver {
  @Query(() => [Country], { nullable: true })
  async getCountries(@Arg('slug', { nullable: true }) slug?: string) {
    if (slug) {
      const qb = getRepository(Country).createQueryBuilder('country');
      qb.leftJoinAndSelect(User, 'user', 'user.countryId = country.id');
      qb.leftJoinAndSelect(
        UserService,
        'userService',
        'userService.userId = user.id'
      );
      qb.leftJoinAndSelect(
        Service,
        'service',
        'service.id = userService.serviceId'
      );
      qb.andWhere('service.slug = :slug', { slug });

      return qb.getMany();
    }

    return Country.find({});
  }

  @Query(() => [Language], { nullable: true })
  getLanguages(@Arg('slug', { nullable: true }) slug?: string) {
    if (slug) {
      const qb = getRepository(Language).createQueryBuilder('language');
      qb.leftJoinAndSelect(UserLanguage, 'userLanguage', 'userLanguage.languageId = language.id');
      qb.leftJoinAndSelect(
        UserService,
        'userService',
        'userService.userId = userLanguage.userId'
      );
      qb.leftJoinAndSelect(
        Service,
        'service',
        'service.id = userService.serviceId', {}
      );
      qb.andWhere('service.slug = :slug', { slug });

      return qb.getMany();
    }

    return Language.find({});
  }
}
