// vamos usar o padrão de projeto decorator

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";

@Entity('tb_responsaveis')
export default class Responsavel {

  @PrimaryColumn({name: 'id_responsavel'})
  id: number;

  @OneToOne(type => Pessoa, responsavel => Responsavel)
  @JoinColumn({name: 'id_responsavel'})
  pessoa: Pessoa;

  @Column("boolean")
  voluntario: boolean;

  @OneToMany(type => Membro, responsavel => Responsavel)
  membros: Membro[];
}