import { MyContext } from '../utils/MyContext';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Language } from '../entity/Language';

@Resolver()
export class LanguageResolver {
  @Query(() => [Language])
  async allLanguages(@Ctx() { req }: MyContext): Promise<Language[]> {
    const userId = req.session.userId;
    userId

    const languages = Language.find({});
    return languages;
  }
}
