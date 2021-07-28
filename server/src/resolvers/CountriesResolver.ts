import { MyContext } from '../utils/MyContext';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Countries } from '../entity/Countries';

@Resolver()
export class CountriesResolver {
  @Query(() => [Countries])
  async allCountries(@Ctx() { req }: MyContext): Promise<Countries[]> {
    const userId = req.session.userId;
    console.log(userId);

    const countries = Countries.find({});
    return countries;
  }
}
