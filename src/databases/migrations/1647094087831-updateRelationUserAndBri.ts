import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationUserAndBri1647094087831
  implements MigrationInterface
{
  name = "updateRelationUserAndBri1647094087831";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_485b1766e6c74c02c8bb1b3228\` ON \`bri\``,
    );
    await queryRunner.query(`ALTER TABLE \`bri\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`briId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_006fe80ceda947717ad96b95c8\` (\`briId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_006fe80ceda947717ad96b95c8\` ON \`user\` (\`briId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_006fe80ceda947717ad96b95c89\` FOREIGN KEY (\`briId\`) REFERENCES \`bri\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_006fe80ceda947717ad96b95c89\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_006fe80ceda947717ad96b95c8\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_006fe80ceda947717ad96b95c8\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`briId\``);
    await queryRunner.query(`ALTER TABLE \`bri\` ADD \`userId\` int NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_485b1766e6c74c02c8bb1b3228\` ON \`bri\` (\`userId\`)`,
    );
  }
}
