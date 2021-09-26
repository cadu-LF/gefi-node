import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tb_sessoes')
export default class Sessao {

  @PrimaryColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column('int')
  qtdeMembros: number;
}