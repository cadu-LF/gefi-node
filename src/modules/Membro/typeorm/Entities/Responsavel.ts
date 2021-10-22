// vamos usar o padrão de projeto decorator

import { Column, Entity, PrimaryColumn } from "typeorm";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";

@Entity('tb_membros')
export default class Membro extends Pessoa {

  @Column()
  id_responsavel: number;
  @Column()
  id_sessao: number;
  @Column()
  nro_registro: number;
  @Column()
  vencimento_registro: Date;
}