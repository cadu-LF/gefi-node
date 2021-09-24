// vamos usar o padrão de projeto decorator

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_sessoes')
export default class Sessao {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column('int')
  qtdeMembros: number;
}