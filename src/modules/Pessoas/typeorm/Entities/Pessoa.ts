import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Endereco from "../../../Endereco/typeorm/Entities/Endereco";
import Membro from "../../../Membro/typeorm/Entities/Membro";
import Responsavel from "../../../Responsavel/typeorm/Entities/Responsavel";

@Entity('tb_pessoas')
export default class Pessoa {

  @PrimaryGeneratedColumn('increment', {name: 'id_pessoa'})
  id: number;

  @Column({name: 'cpf'})
  cpf: string;
  
  @Column({name: 'nome'})
  nome: string;

  @Column({name: 'data_nascimento'})
  dataNascimento: Date;

  @Column({name: 'sexo'})
  sexo: string;

  @Column({name: 'email'})
  email: string;

  @ManyToOne(type => Endereco, pessoa => Pessoa)
  @JoinColumn({name: 'id_endereco'})
  enderecos: Endereco[];

  @OneToOne(type => Responsavel, pessoa => Pessoa)
  responsavel: Responsavel;

  @OneToOne(type => Membro, pessoa => Pessoa)
  membro: Membro;
}