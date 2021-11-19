import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePessoa1634340580725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_pessoas',
            columns: [
                {
                    name: 'id_pessoa',
                    type: 'serial',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'id_endereco',
                    type: 'integer',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'data_nascimento',
                    type: 'date'
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

        const enderecoForeignKey = new TableForeignKey({
            columnNames: ['id_endereco'],
            referencedColumnNames: ['id_endereco'],
            referencedTableName: 'tb_enderecos',
            onDelete: 'CASCADE'
        });
        await queryRunner.createForeignKey('tb_pessoas', enderecoForeignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_pessoas')
    }

}
