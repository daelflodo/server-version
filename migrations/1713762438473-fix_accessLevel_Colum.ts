import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAccessLevelColum1713762438473 implements MigrationInterface {
    name = 'FixAccessLevelColum1713762438473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_admin" RENAME COLUMN "acces_lecel" TO "access_level"`);
        await queryRunner.query(`ALTER TYPE "public"."user_admin_acces_lecel_enum" RENAME TO "user_admin_access_level_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_admin_access_level_enum" RENAME TO "user_admin_acces_lecel_enum"`);
        await queryRunner.query(`ALTER TABLE "user_admin" RENAME COLUMN "access_level" TO "acces_lecel"`);
    }

}
