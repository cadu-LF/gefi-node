import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNroRegistro1632680808711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_nro_registro',
            columns: [
                {
                    name: 'nro_registro',
                    type: 'integer',
                    isPrimary: true,
                },
                {
                    name: 'data_vencimento',
                    type: 'date'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_nro_registro');
    }

}
