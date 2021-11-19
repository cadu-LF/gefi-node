import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEndereco1632680293541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_enderecos',
            columns: [
                {
                    name: 'id_endereco',
                    type: 'serial',
                    isPrimary: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'rua',
                    type: 'varchar'
                },
                {
                    name: 'bairro',
                    type: 'varchar'
                },
                {
                    name: 'numero',
                    type: 'integer'
                },
                {
                    name: 'complemento',
                    type: 'varchar'
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_enderecos');
    }

}
