import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTipoProdutos1634596377220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_tipos_produtos',
            columns: [
                {
                    name: 'id_tipo_produto',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'ds_tipo_produto',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_tipos_produtos')
    }

}
