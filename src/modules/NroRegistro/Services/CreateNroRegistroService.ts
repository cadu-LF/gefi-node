import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import NroRegistro from "../typeorm/Entities/NroRegistro";
import NroRegistroRepository from "../typeorm/Repositories/NroRegistroRepository";

interface IRequest {
  nroRegistro: number,
  dataVencimento: Date,
  
}

export default class CreateNroRegistroService {

  public async execute({nroRegistro, dataVencimento}: IRequest): Promise<NroRegistro> {
    let nroRegistroReposiory = getCustomRepository(NroRegistroRepository);

    let nroRegistroExist = await nroRegistroReposiory.findByNroRegistro(nroRegistro)

    if(nroRegistroExist) {
      throw new AppErrors('Já temos numero do registro cadastrado');
    } 

    let newNroRegistro = nroRegistroReposiory.create({
     nroRegistro,
     dataVencimento,
    })

    await nroRegistroReposiory.save(newNroRegistro);

    return newNroRegistro;

  }
}