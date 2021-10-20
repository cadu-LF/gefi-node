import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_pessoas')
export default class Pessoa {

  @PrimaryGeneratedColumn()
  cpf: string;
  
  @Column()
  nome: string;

  @Column('int')
  idade: number;

  @Column()
  sexo: string;

  @Column()
  email: string;
}