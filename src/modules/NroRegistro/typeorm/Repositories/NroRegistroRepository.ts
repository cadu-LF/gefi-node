// repositório da entidade Product

import { EntityRepository, Repository } from "typeorm";
import NroRegistro from "../Entities/NroRegistro";

@EntityRepository(NroRegistro)
export default class NroRegistroRepository extends Repository<NroRegistro>{

  /**
   * Busca NroRegistro pelo Numero de registro
   * 
   * @param number: nroRegistro
   * @return Promisse<NroRegistro | undefined>
   */
  public async findByNroRegistro(nroRegistro: number): Promise<NroRegistro | undefined> {
    
    const response = await this.findOne({
      where: { 
        nroRegistro
      }
    })

    return response
  }
}