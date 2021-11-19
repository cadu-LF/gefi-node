import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsuario1632681295579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_usuarios',
            columns: [
                {
                    name: 'id_usuario',
                    type: 'serial',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'username',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_usuarios');
    }
}
