import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1659267620409 implements MigrationInterface {
  name = 'CreateUserTable1659267620409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`userName\` varchar(15) NOT NULL, \`hashedPassword\` varchar(300) NOT NULL, \`displayName\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
