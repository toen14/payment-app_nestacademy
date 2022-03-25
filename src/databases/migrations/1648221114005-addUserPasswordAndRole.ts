import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserPasswordAndRole1648221114005 implements MigrationInterface {
    name = 'addUserPasswordAndRole1648221114005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_006fe80ceda947717ad96b95c8\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('Admin', 'User') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_006fe80ceda947717ad96b95c8\` ON \`user\` (\`briId\`)`);
    }

}
