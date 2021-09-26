import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import NroRegistroRepository from "../typeorm/Repositories/NroRegistroRepository";

interface IRequest {
  nroRegistro: string,

}

export default class DeleteNroRegistroService {

  public async execute({nroRegistro}: IRequest): Promise<void> {

    let nroRegistroRepository = getCustomRepository(NroRegistroRepository);

    let registro = await nroRegistroRepository.findOne(Number(nroRegistro));

    if(!registro) {
      throw new AppErrors(`Número de registro: ${nroRegistro} não existe`);
    }
    
    await nroRegistroRepository.remove(registro);
  }
}