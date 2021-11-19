import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProduto1632680973979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_produtos',
            columns: [
                {
                    name: 'id_produto',
                    type: 'serial',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'id_tipo_produto',
                    type: 'integer',
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

        queryRunner.clearSqlMemory();
        
        const foreignKey = new TableForeignKey({
            columnNames: ["id_tipo_produto"],
            referencedColumnNames: ["id_tipo_produto"],
            referencedTableName: "tb_tipos_produtos",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("tb_tipos_produtos", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_produtos');
    }

}
