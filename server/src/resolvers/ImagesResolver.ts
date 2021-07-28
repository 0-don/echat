import { MyContext } from '../utils/MyContext';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Images } from '../entity/Images';
import { isAuth } from '../middleware/isAuth';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { fileUpload } from '../utils/fileUpload';
import { getConnection } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { log } from 'console';

type ImageTypes = 'profile' | 'cover' | 'secondary';

@Resolver()
export class ImagesResolver {
  @Mutation(() => Boolean)
  async deleteAllImages() {
    Images.delete({});
    return true;
  }

  @Query(() => [Images], { nullable: true })
  @UseMiddleware(isAuth)
  async userImages(
    @Ctx() { req }: MyContext,
    @Arg('type', { nullable: true }) type?: ImageTypes
  ): Promise<Images[]> {
    const userId = req.session.userId;

    let images: Images[];
    if (type) {
      images = await Images.find({ where: { userId, type } });
    } else {
      images = await Images.find({ where: { userId } });
    }

    return images;
  }

  @Mutation(() => [Images])
  @UseMiddleware(isAuth)
  async multipleUpload(
    @Arg('type') type: ImageTypes,
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload],
    @Ctx() { req }: MyContext
  ): Promise<Images[]> {
    const { userId } = req.session;

    const imagesList: QueryDeepPartialEntity<Images>[] = [];
    for (let file of files) {
      const res = await fileUpload(file);
      imagesList.push({
        url: res.secure_url,
        publicId: res.public_id,
        userId,
        type,
      });
    }

    if (type !== 'secondary') {
      try {
        await Images.delete({ userId, type });
      } catch (err) {
        log(err);
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Images)
      .values(imagesList)
      .returning('*')
      .execute();

    return result.raw;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteImage(
    @Arg('publicId') publicId: string,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await Images.delete({ publicId, userId });

    return true;
  }
}
