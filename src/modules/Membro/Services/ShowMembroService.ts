import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Membro from "../typeorm/Entities/Membro"
import MembroRepository from "../typeorm/Repositories/MembroRepository"

interface IRequest {
  id: string
}

export default class ShowMembroService {
  
  public async execute({id}: IRequest): Promise<Membro> {

    let membroRepository = getCustomRepository(MembroRepository);
    let membroExists = await membroRepository.findOne(id);

    if(!membroExists) {
      throw new AppErrors(`Não há ninguém com o id: ${id}`);
    }
    
    return membroExists;
  }
}