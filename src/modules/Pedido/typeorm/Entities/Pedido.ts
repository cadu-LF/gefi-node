import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Membro from "../../../Membro/typeorm/Entities/Membro";
import Produto from "../../../Produto/typeorm/Entities/Produto";
import Usuario from "../../../Usuario/typeorm/Entities/Usuario";

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

  @ManyToMany(type => Membro, pedido => Pedido)
  @JoinTable()
  membro: Membro;

  @ManyToOne(type => Usuario, pedidos => Pedido)
  @JoinTable()
  usuario: Usuario;
}
