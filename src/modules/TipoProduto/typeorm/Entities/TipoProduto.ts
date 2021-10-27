import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Produto from "../../../Produto/typeorm/Entities/Produto";

@Entity('tb_tipos_produtos')
export default class TipoProduto {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  descricao: string;

  @OneToMany(type => Produto, tipoProduto => TipoProduto)
  produtos: Produto;
}