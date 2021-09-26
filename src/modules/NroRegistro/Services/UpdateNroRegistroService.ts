import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import nroRepository from "../typeorm/Entities/NroRegistro";
import NroRegistroRepository from "../typeorm/Repositories/NroRegistroRepository";

interface IRequest{
  nroRegistro: number,
  dataVencimento: Date,
}

export default class UpdateNroRegistroService{
  public async execute({nroRegistro, dataVencimento}: IRequest): Promise<nroRepository>{
    let nroRegistroRepository = getCustomRepository(NroRegistroRepository);

    let nroRegistroExists = await nroRegistroRepository.findOne(nroRegistro);

    if(!nroRegistroExists){
      throw new AppErrors('Número registro não existe');
    }

    nroRegistroExists.dataVencimento = dataVencimento;
    await nroRegistroRepository.save(nroRegistroExists)
    
    return nroRegistroExists;
  }
}