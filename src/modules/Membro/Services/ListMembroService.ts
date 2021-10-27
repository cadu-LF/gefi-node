import { getCustomRepository } from "typeorm";
import Membro from "../typeorm/Entities/Membro";
import MembroRepository from "../typeorm/Repositories/MembroRepository";

export default class ListMembroService {
  
  public async execute(): Promise<Membro[]> {

    let membroRepository = getCustomRepository(MembroRepository);
    let membro = await membroRepository.find();
    
    return membro;
  }
}