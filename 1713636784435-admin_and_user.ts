import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminAndUser1713636784435 implements MigrationInterface {
    name = 'AdminAndUser1713636784435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "services_id" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "acces_lecel" "public"."user_admin_acces_lecel_enum" NOT NULL, "user_id" uuid, "admin_id" uuid, CONSTRAINT "PK_c143511e72fac735b8006051e55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "number_id" character varying NOT NULL, "number_phone" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_f6f9404feacec9aa10726d39885" UNIQUE ("number_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_admin" ADD CONSTRAINT "FK_41f97639c44370dac796fd22686" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_admin" ADD CONSTRAINT "FK_6959d87e7f97de23fdc167741b1" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_admin" DROP CONSTRAINT "FK_6959d87e7f97de23fdc167741b1"`);
        await queryRunner.query(`ALTER TABLE "user_admin" DROP CONSTRAINT "FK_41f97639c44370dac796fd22686"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_admin"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
