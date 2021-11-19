import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePedido1637196968571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_pedidos',
            columns: [
                {
                    name: 'id_pedido',
                    type: 'serial',
                    isPrimary: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'id_membro',
                    type: 'integer',
                },
                {
                    name: 'qtde_produto',
                    type: 'integer',
                },
                {
                    name: 'valor_total',
                    type: 'decimal',
                    scale: 2,
                },
                {
                    name: 'situacao',
                    type: 'varchar'
                },
                {
                    name: 'observacao',
                    type: 'varchar'
                }
            ]
        }))

        queryRunner.clearSqlMemory();
        
        const membrosForeignKey = new TableForeignKey({
            columnNames: ["id_membro"],
            referencedColumnNames: ["id_membro"],
            referencedTableName: "tb_membros",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("tb_pedidos", membrosForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_pedidos')
    }

}
