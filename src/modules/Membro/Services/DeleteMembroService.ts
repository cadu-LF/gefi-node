import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import MembroRepository from "../typeorm/Repositories/MembroRepository";

interface IRequest {
  id: string,
}

export default class DeleteMembroService {

  public async execute({id}: IRequest): Promise<void> {

    let membroRepository = getCustomRepository(MembroRepository);

    let membro = await membroRepository.findOne(Number(id));

    if(!membro) {
      throw new AppErrors(`Não há ninguém com o id: ${id}`);
    }
    
    await membroRepository.remove(membro);
  }
}