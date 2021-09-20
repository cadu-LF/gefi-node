// vamos usar o padrão de projeto decorator

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_enderecos')
export default class Endereco {

  @PrimaryGeneratedColumn()
  id: string;
  
  @Column('int')
  numero: number;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  complemento: string;

}