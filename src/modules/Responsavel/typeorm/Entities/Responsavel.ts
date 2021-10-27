// vamos usar o padrão de projeto decorator

import { Column, Entity, OneToMany } from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";

@Entity('tb_nro_registro')
export default class Responsavel extends Pessoa {

  @Column("boolean")
  voluntario: boolean;

  @OneToMany(type => Membro, responsavel => Responsavel)
  membros: Membro;
}