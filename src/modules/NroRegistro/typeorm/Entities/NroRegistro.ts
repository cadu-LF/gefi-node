// vamos usar o padrão de projeto decorator

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tb_nro_registro')
export default class NroRegistro {

  @PrimaryColumn('int')
  nroRegistro: number;

  @Column("date")
  dataVencimento: Date;

}