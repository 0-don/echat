import { Country } from '../entity/Country';
import { Query, Resolver } from 'type-graphql';
import { Language } from '../entity/Language';

@Resolver()
export class ExtraResolver {
  @Query(() => [Country])
  getCountries() {
    return Country.find({});
  }

  @Query(() => [Language])
  getLanguages() {
    return Language.find({});
  }
}
