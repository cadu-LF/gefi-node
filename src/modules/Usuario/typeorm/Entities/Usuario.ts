
// entity pega os campos da tabela e transforma em uma classe
@Entity('tb_usuarios')
export default class Usuario{

  @PrimaryGeneratedColumn()
  idUsario: integer;

  @Column
  userName: string;

  @Column
  password: string;
}