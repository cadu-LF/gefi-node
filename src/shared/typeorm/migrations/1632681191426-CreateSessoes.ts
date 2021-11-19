import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSessoes1632681191426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_sessoes',
            columns: [
                {
                    name: 'id_sessao',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'nome_sessao',
                    type: 'varchar'
                },
                {
                    name: 'qtde_membros',
                    type: 'integer',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_sessoes');
    }
}
