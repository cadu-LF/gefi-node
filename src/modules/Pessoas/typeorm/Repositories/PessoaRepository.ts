import { EntityRepository, Repository } from "typeorm";
import Pessoa from "../Entities/Pessoa";

@EntityRepository(Pessoa)
export default class PessoaRepository extends Repository<Pessoa>{

  /**
   * Busca Pessoa pelo cpf
   * 
   * @param string: cpf
   * @return Promisse<Pessoa | undefined>
   */
  public async findByCpf(cpf: string): Promise<Pessoa | undefined> {
    
    const pessoa = await this.findOne({
      where: { 
        rua: cpf
      }
    })

    return pessoa
  }

  /**
   * Busca Pessoa pelo email
   * 
   * @param string: email
   * @return Promisse<Pessoa | undefined>
   */
  public async findByEmail(email: string): Promise<Pessoa | undefined> {
    
    const pessoa = await this.findOne({
      where: { 
        email
      }
    })

    return pessoa
  }
}