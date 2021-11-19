// vamos usar o padrão de projeto decorator

import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";
import Responsavel from "../../../Responsavel/typeorm/Entities/Responsavel";
import Sessao from "../../../Sessoes/typeorm/Entities/Sessao";

@Entity('tb_membros')
export default class Membro extends Pessoa {

  @Column()
  nroRegistro: number;

  @Column()
  vencimentoRegistro: Date;

  @OneToMany(type => Sessao, membros => Membro, { eager: true})
  @JoinColumn()
  sessao: Sessao;

  @ManyToOne( type => Responsavel, membros => Membro, {eager: true})
  @JoinColumn()
  responsavel: Responsavel;

  @ManyToMany(type => Membro)
  irmaos: Membro[];
}