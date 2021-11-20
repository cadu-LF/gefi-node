import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Pedido from "../../../Pedido/typeorm/Entities/Pedido";
import TipoProduto from "../../../TipoProduto/typeorm/Entities/TipoProduto";

@Entity('tb_produtos')
export default class Produto {
  
  @PrimaryGeneratedColumn('increment', {name: 'id_produto'})
  codProduto: number;

  @Column({name: 'desc_produto'})
  descProduto: string;

  @Column('int', {name: 'valor_produto'})
  valorProduto: number;

  @ManyToOne(type => TipoProduto, produtos => Produto, {eager: true})
  @JoinColumn({name: 'id_tipo_produto'})
  tipoProduto: TipoProduto;

  @ManyToMany(type => Pedido, produtos => Produto)
  pedidos: Pedido[];
}
