// repositório da entidade Product

import { EntityRepository, Repository } from "typeorm";
import Responsavel from "../Entities/Responsavel";

@EntityRepository(Responsavel)
export default class ResponsavelRepository extends Repository<Responsavel>{
    /**
   * Busca Responsavel pelo cpf
   * 
   * @param string: cpf
   * @return Promisse<Responsavel | undefined>
   */
  public async findByCpf(cpf: string): Promise<Responsavel | undefined> {
    
    const responsavel = await this.findOne({
      where: { 
        rua: cpf
      }
    })

    return responsavel
  }

  /**
   * Busca Responsavel pelo email
   * 
   * @param string: email
   * @return Promisse<Responsavel | undefined>
   */
  public async findByEmail(email: string): Promise<Responsavel | undefined> {
    
    const responsavel = await this.findOne({
      where: { 
        email
      }
    })

    return responsavel;
  }

  /**
   * Busca Responsavel pelo id
   * 
   * @param number: id
   * @return Promisse<Response | undefined>
   */
  public async findById(id: number): Promise<Responsavel | undefined> {
    const responsavel = await this.findOne({
      where: {
        id
      }
    })

    return responsavel;
  }
}