import { MyContext } from '../utils/MyContext';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Languages } from '../entity/Languages';

@Resolver()
export class LanguagesResolver {
  @Query(() => [Languages])
  async allLanguages(@Ctx() { req }: MyContext): Promise<Languages[]> {
    const userId = req.session.userId;
    console.log(userId);

    const languages = Languages.find({});
    return languages;
  }
}
