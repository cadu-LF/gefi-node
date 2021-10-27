import { Column, Entity } from "typeorm";

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
}
