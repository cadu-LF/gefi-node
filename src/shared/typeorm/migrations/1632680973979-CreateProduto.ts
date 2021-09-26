import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduto1632680973979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_produtos',
            columns: [
                {
                    name: 'cod_produto',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'categoria',
                    type: 'varchar'
                },
                {
                    name: 'desc_produto',
                    type: 'varchar'
                },
                {
                    name: 'valor_produto',
                    type: 'decimal',
                    scale: 2
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_produtos');
    }

}
