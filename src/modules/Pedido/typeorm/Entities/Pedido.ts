import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";
import Produto from "../../../Produto/typeorm/Entities/Produto";

@Entity('tb_produtos')
export default class Pedido {
  
  @PrimaryGeneratedColumn()
  idPedido: number;

  @Column()
  situacao: string;

  @Column()
  observacao: string;

  @Column('float')
  valorTotal: number;

  @ManyToMany(type => Produto, pedido => Pedido)
  @JoinTable()
  produtos: Produto[];

  @ManyToOne(type => Membro, pedido => Pedido)
  @JoinTable()
  membro: Membro 
}
