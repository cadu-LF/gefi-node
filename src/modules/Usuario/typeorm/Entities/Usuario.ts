import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pedido from "../../../Pedido/typeorm/Entities/Pedido";

@Entity('tb_usuarios')
export default class Usuario {

  @PrimaryGeneratedColumn('increment', { name: 'id_usuario' })
  id: number;

  @Column({ name: 'username', type:'varchar', length: 20 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length:30 })
  password: string;

  @OneToMany(type => Pedido, usuarios => Usuario)
  pedidos: Pedido[];
}