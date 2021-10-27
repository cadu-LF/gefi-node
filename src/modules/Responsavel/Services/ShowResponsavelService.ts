import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Responsavel from "../typeorm/Entities/Responsavel"
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository"

interface IRequest {
  id: string
}

export default class ShowResponsavelService {
  
  public async execute({id}: IRequest): Promise<Responsavel> {

    let responsavelRepository = getCustomRepository(ResponsavelRepository);
    let responsavelExists = await responsavelRepository.findOne(id);

    if(!responsavelExists) {
      throw new AppErrors(`Não há ninguém com o id: ${id}`);
    }
    
    return responsavelExists;
  }
}