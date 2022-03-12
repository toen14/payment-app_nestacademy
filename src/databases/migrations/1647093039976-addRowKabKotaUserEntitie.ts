import { MigrationInterface, QueryRunner } from "typeorm";

export class addRowKabKotaUserEntitie1647093039976
  implements MigrationInterface
{
  name = "addRowKabKotaUserEntitie1647093039976";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`kabKota\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`kabKota\``);
  }
}
