import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServiceMigration1629914970959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'E-Chat', 'e-chat', 'Interactive Entertainment', 1, 'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;
    
    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Movie', 'movie', 'Interactive Entertainment', 2, 'https://static-cdn.jtvnw.net/ttv-boxart/Special%20Events-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;

    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Karaoke', 'karaoke', 'Interactive Entertainment', 3, 'https://static-cdn.jtvnw.net/ttv-boxart/ASMR-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;



    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Relationship advice', 'relationship-advice', 'More Lifestyles', 10, 'https://static-cdn.jtvnw.net/ttv-boxart/Talk%20Shows%20&%20Podcasts-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;

    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Emotional support', 'emotional-support', 'More Lifestyles', 11, 'https://static-cdn.jtvnw.net/ttv-boxart/Pools,%20Hot%20Tubs,%20and%20Beaches-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;
    
    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Wake-up call', 'wake-up-call', 'More Lifestyles', 12, 'https://static-cdn.jtvnw.net/ttv-boxart/Music-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;
    
    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Sleep Call', 'sleep-call', 'More Lifestyles', 13, 'https://static-cdn.jtvnw.net/ttv-boxart/Chess-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;
    
    INSERT INTO public.service(name, slug, type, popularity, "boxArtUrl")
    VALUES
    ( 'Drawing', 'drawing', 'More Lifestyles', 14, 'https://static-cdn.jtvnw.net/ttv-boxart/Art-285x380.jpg')
    ON CONFLICT (name) DO UPDATE SET "boxArtUrl" = EXCLUDED."boxArtUrl", popularity = EXCLUDED.popularity;

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM public.service WHERE type IN ('Interactive Entertainment');
    DELETE FROM public.service WHERE type IN ('More Lifestyles');
    `);
  }
}
