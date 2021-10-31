import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import Pedido from "../../../Pedido/typeorm/Entities/Pedido";
import TipoProduto from "../../../TipoProduto/typeorm/Entities/TipoProduto";

@Entity('tb_produtos')
export default class Produto {
  
  @Column('int')
  codProduto: number;

  @Column()
  categoria: string;

  @Column()
  descProduto: string;

  @Column('int')
  valorProduto: number;

  @ManyToOne(type => TipoProduto, produtos => Produto)
  @JoinTable()
  tipoProduto: TipoProduto;

  @ManyToMany(type => Pedido, produtos => Produto)
  pedidos: Pedido[];
}
