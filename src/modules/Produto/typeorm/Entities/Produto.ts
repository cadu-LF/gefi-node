import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
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
}
