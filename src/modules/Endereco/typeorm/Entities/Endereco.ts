import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pessoa from "../../../Pessoas/typeorm/Entities/Pessoa";

@Entity('tb_enderecos')
export default class Endereco {

  @PrimaryGeneratedColumn('increment', {name: 'id_endereco'})
  id: number;
  
  @Column('int', {name: 'numero'})
  numero: number;

  @Column({name: 'rua'})
  rua: string;

  @Column({name: 'bairro'})
  bairro: string;

  @Column({name: 'complemento'})
  complemento: string;

  @OneToMany(type => Pessoa, enderecos => Endereco)
  pessoas: Pessoa[];
}