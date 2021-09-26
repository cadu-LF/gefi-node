import { getCustomRepository } from "typeorm";
import NroRegistro from "../typeorm/Entities/NroRegistro";
import NroRegistroRepository from "../typeorm/Repositories/NroRegistroRepository";

export default class ListNroRegistroService {
  
  public async execute(): Promise<NroRegistro[]> {

    let nroRegistroRepository = getCustomRepository(NroRegistroRepository);
    let nroRegistro = await nroRegistroRepository.find();
    
    return nroRegistro;
  }
}