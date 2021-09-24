// repositório da entidade Product

import { EntityRepository, Repository } from "typeorm";
import Endereco from "../Entities/Endereco";

@EntityRepository(Endereco)
export default class EnderecoRepository extends Repository<Endereco>{

  /**
   * Busca Endereco pela rua
   * 
   * @param string: rua
   * @return Promisse<Endereco | undefined>
   */
  public async findByRua(rua: string): Promise<Endereco | undefined> {
    
    const endereco = await this.findOne({
      where: { 
        rua
      }
    })

    return endereco
  }

  /**
   * Busca endereco por número
   * 
   * @param number: numero
   * @return Promisse<Endereco | undefined>
   */
  public async findByNumero(numero: number): Promise<Endereco | undefined> {
    
    const endereco = await this.findOne({
      where: { 
        numero
      }
    })

    return endereco
  }

  /**
   * Busca Endereco pelo id
   * 
   * @param number: id
   * @return Promisse<Endereco | undefined>
   */
  public async findById(id: number): Promise<Endereco | undefined> {
    
    const endereco = await this.findOne({
      where: { 
        id
      }
    })

    return endereco
  }
}