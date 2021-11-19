// vamos usar o padrão de projeto decorator

import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";
import Responsavel from "../../../Responsavel/typeorm/Entities/Responsavel";
import Sessao from "../../../Sessoes/typeorm/Entities/Sessao";

@Entity('tb_membros')
export default class Membro {

  @PrimaryColumn({name: 'id_membro'})
  id: number;

  @OneToOne(type => Pessoa, responsavel => Responsavel)
  @JoinColumn({name: 'id_membro'})
  pessoa: Pessoa;

  @Column()
  nroRegistro: number;

  @Column()
  vencimentoRegistro: Date;

  @OneToMany(type => Sessao, membros => Membro, { eager: true})
  @JoinColumn()
  sessao: Sessao;

  @ManyToOne( type => Responsavel, membros => Membro, {eager: true})
  @JoinColumn({name: 'id_responsavel'})
  responsavel: Responsavel;
}