// vamos usar o padrão de projeto decorator

import { Column, Entity, PrimaryColumn } from "typeorm";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";

@Entity('tb_nro_registro')
export default class Responsavel extends Pessoa {

  @Column("boolean")
  voluntario: boolean;
}