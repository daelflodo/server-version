import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceIdOptional1713760590942 implements MigrationInterface {
    name = 'ServiceIdOptional1713760590942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "services_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "services_id" SET NOT NULL`);
    }

}
