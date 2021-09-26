import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}