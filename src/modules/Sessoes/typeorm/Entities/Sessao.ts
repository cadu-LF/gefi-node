import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";

@Entity('tb_sessoes')
export default class Sessao {

  @PrimaryColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column('int')
  qtdeMembros: number;

  @OneToMany(type => Membro, sessao => Sessao)
  membros: Membro[]
}