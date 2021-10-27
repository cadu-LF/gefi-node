// repositório da entidade Product

import { EntityRepository, Repository } from "typeorm";
import Membro from "../Entities/Membro";

@EntityRepository(Membro)
export default class MembroRepository extends Repository<Membro>{
    /**
   * Busca Membro pelo cpf
   * 
   * @param string: cpf
   * @return Promisse<Membro | undefined>
   */
  public async findByCpf(cpf: string): Promise<Membro | undefined> {
    
    const membro = await this.findOne({
      where: { 
        cpf
      }
    })

    return membro
  }

  /**
   * Busca Membro pelo email
   * 
   * @param string: email
   * @return Promisse<Membro | undefined>
   */
  public async findByEmail(email: string): Promise<Membro | undefined> {
    
    const membro = await this.findOne({
      where: { 
        email
      }
    })

    return membro
  }

  /**
   * Busca Membro pelo nroRegistro
   * 
   * @param nroRegistro: nroRegistro
   * @return Promisse<Membro | undefined>
   */
  public async findByNroRegistro(nroRegistro: number): Promise<Membro | undefined> {

    const membro = await this.findOne({
      where: { 
        nroRegistro
      }
    })

    return membro;
  }
}