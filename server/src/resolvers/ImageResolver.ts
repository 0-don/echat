import { MyContext } from '../utils/types/MyContext';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Image } from '../entity/Image';
import { isAuth } from '../middleware/isAuth';

import { getConnection } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { log } from 'console';

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { fileUpload } from '../utils/fileUpload';
type ImageTypes = 'profile' | 'cover' | 'secondary';

@Resolver(Image)
export class ImageResolver {
  @Mutation(() => Boolean)
  async deleteAllImages() {
    Image.delete({});
    return true;
  }

  @Query(() => [Image], { nullable: true })
  async allImages() {
    const images = await Image.find({});
    return images;
  }

  @Query(() => [Image], { nullable: true })
  @UseMiddleware(isAuth)
  async userImages(
    @Ctx() { req }: MyContext,
    @Arg('type', { nullable: true }) type?: ImageTypes
  ): Promise<Image[]> {
    const userId = req.session.userId;

    let images: Image[];
    if (type) {
      images = await Image.find({ where: { userId, type } });
    } else {
      images = await Image.find({ where: { userId } });
    }

    return images;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async multipleUpload(
    @Ctx() { req }: MyContext,
    @Arg('type') type: ImageTypes,
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<Boolean> {
    const { userId } = req.session;

    const imagesList: QueryDeepPartialEntity<Image>[] = [];
    for (let file of files) {
      const res = await fileUpload(file);
      imagesList.push({
        url: res.secure_url,
        publicId: res.public_id,
        userId,
        type,
      });
    }

    if (type === 'cover' || type === 'profile') {
      try {
        await Image.delete({ userId, type });
      } catch (err) {
        log(err);
      }
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(imagesList)
      .returning('*')
      .execute();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteImage(
    @Arg('publicId') publicId: string,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    await Image.delete({ publicId, userId });

    return true;
  }
}
