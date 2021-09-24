// repositório da entidade Product

import { EntityRepository, Repository } from "typeorm";
import Sessao from "../Entities/Sessao";

@EntityRepository(Sessao)
export default class SessaoRepository extends Repository<Sessao>{

  /**
   * Busca Sessao pelo nome
   * 
   * @param string: nome
   * @return Promisse<Sessao | undefined>
   */
  public async findByNome(nome: string): Promise<Sessao | undefined> {
    
    const sessao = await this.findOne({
      where: { 
        nome
      }
    })

    return sessao
  }

  /**
   * Busca Sessao pelo id
   * 
   * @param number: id
   * @return Promisse<Sessao | undefined>
   */
  public async findById(id: number): Promise<Sessao | undefined> {
    
    const sessao = await this.findOne({
      where: { 
        id
      }
    })

    return sessao
  }
}