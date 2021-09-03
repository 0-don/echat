import { Country } from '../entity/Country';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ExtraResolver {
  @Query(() => [Country])
  getCountries() {
    return Country.find({});
  }
}
