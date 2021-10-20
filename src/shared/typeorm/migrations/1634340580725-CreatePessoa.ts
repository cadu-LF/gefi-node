import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePessoa1634340580725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_pessoas',
            columns: [
                {
                    name: 'cpf',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'idade',
                    type: 'integer'
                },
                {
                    name: 'sexo',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_pessoas')
    }

}
