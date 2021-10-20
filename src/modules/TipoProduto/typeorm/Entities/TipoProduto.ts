import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_tipos_produtos')
export default class TipoProduto {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  descricao: string;
}