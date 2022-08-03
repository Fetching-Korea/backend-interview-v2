import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserLike1659505239331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`UserLike\` (
            \`user_id\` VARCHAR(255) NOT NULL, 
            \`goods_id\` VARCHAR(255) NOT NULL, 

            PRIMARY KEY (\`user_id\`, \`goods_id\`), 
            FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`),
            FOREIGN KEY (\`goods_id\`) REFERENCES \`good\` (\`id\`)
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`UserLike\``);
  }
}
