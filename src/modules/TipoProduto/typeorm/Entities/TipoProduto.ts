import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Produto from "../../../Produto/typeorm/Entities/Produto";

@Entity('tb_tipos_produtos')
export default class TipoProduto {

  @PrimaryGeneratedColumn('increment', {name: 'id_tipo_produto'})
  id: number;
  
  @Column({name: 'ds_tipo_produto'})
  descricao: string;

  @OneToMany(type => Produto, tipoProduto => TipoProduto)
  produtos: Produto;
}