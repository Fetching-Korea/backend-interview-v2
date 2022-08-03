import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGoodsTable1659321994641 implements MigrationInterface {
  name = 'CreateGoodsTable1659321994641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`good\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(60) NOT NULL, \`description\` varchar(300) NOT NULL, \`brand\` varchar(30) NOT NULL, \`price\` int NOT NULL, \`size\` int NOT NULL, \`color\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`good\``);
  }
}
