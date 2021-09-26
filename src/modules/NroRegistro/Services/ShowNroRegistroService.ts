import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import NroRegistro from "../typeorm/Entities/NroRegistro"
import NroRegistroRepository from "../typeorm/Repositories/NroRegistroRepository"

interface IRequest {
  nroRegistro: string
}

export default class ShowNroRegistroService {
  
  public async execute({nroRegistro}: IRequest): Promise<NroRegistro> {

    let nroRegistroRepository = getCustomRepository(NroRegistroRepository);
    let nroRegistroExist = await nroRegistroRepository.findOne(Number(nroRegistro));

    if(!nroRegistroExist) {
      throw new AppErrors(`Número de Registro: ${nroRegistro} não existe`);
    }
    
    return nroRegistroExist;
  }
}