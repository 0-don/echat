import { MyContext } from '../utils/types/MyContext';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Language } from '../entity/Language';
import { UserLanguage } from '../entity/UserLanguage';

@Resolver()
export class LanguageResolver {
  @Query(() => [Language])
  async allLanguages(): Promise<Language[]> {
    return Language.find();
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteUserLanguage(
    @Arg('name') name: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const { userId } = req.session;
    if (!userId) {
      return false;
    }

    await UserLanguage.delete({ userId, name });

    return true;
  }
}
