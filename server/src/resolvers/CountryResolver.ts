import { MyContext } from '../utils/types/MyContext';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Country } from '../entity/Country';

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async allCountries(@Ctx() { req }: MyContext): Promise<Country[]> {
    const userId = req.session.userId;
    userId

    const countries = Country.find({});
    return countries;
  }
}
