import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMembro1634862745649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_membros',
            columns: [
                {
                    name: 'id_membro',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'id_responsavel',
                    type: 'integer',
                },
                {
                    name: 'id_sessao',
                    type: 'integer'
                },
                {
                    name: 'nro_registro',
                    type: 'integer'
                },
                {
                    name: 'vencimento_registro',
                    type: 'date'
                }
            ]
        }))

        queryRunner.clearSqlMemory();
        
        const pessoasForeignKey = new TableForeignKey({
            columnNames: ["id_membro"],
            referencedColumnNames: ["id_pessoa"],
            referencedTableName: "tb_pessoas",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("tb_membros", pessoasForeignKey);
        
        queryRunner.clearSqlMemory();

        const responsavelForeignKey = new TableForeignKey({
            columnNames: ['id_responsavel'],
            referencedColumnNames: ['id_responsavel'],
            referencedTableName: 'tb_responsaveis',
            onDelete: 'CASCADE'
        });
        await queryRunner.createForeignKey('tb_membros', responsavelForeignKey)

        queryRunner.clearSqlMemory();

        const sessaoForeignKey = new TableForeignKey({
            columnNames: ['id_sessao'],
            referencedColumnNames: ['id_sessao'],
            referencedTableName: 'tb_sessoes',
            onDelete: 'CASCADE'
        });
        await queryRunner.createForeignKey('tb_membros', sessaoForeignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_membros')
    }

}
