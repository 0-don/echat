import { MigrationInterface, QueryRunner } from 'typeorm';

export class GlobalChat1635367145742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO room (channel) VALUES ('global');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM room;`);
  }
}
