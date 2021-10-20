import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateResponsavel1634340898996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_responsaveis',
            columns: [
                {
                    name: 'id_responsavel',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'voluntario',
                    type: 'boolean'
                }
            ]
        }))

        queryRunner.clearSqlMemory();

        const foreignKey = new TableForeignKey({
            columnNames: ["id_responsavel"],
            referencedColumnNames: ["id_pessoa"],
            referencedTableName: "tb_pessoas",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("tb_responsaveis", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_responsaveis')
    }

}
