import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";

@Entity('tb_sessoes')
export default class Sessao {

  @PrimaryGeneratedColumn('increment', {name: 'id_sessao'})
  id: number;
  
  @Column({name: 'nome_sessao'})
  nome: string;
  
  @Column('int', {name: 'qtde_membros'})
  qtdeMembros: number;

  @OneToMany(type => Membro, sessao => Sessao)
  membros: Membro[]
}