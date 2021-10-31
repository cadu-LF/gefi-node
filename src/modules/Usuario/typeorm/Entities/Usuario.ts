import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pedido from "../../../Pedido/typeorm/Entities/Pedido";

@Entity('tb_usuarios')
export default class Usuario {

  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Pedido, usuarios => Usuario)
  pedidos: Pedido[];
}