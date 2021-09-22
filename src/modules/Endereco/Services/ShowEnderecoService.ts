import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppErrors"
import Endereco from "../typeorm/Entities/Endereco"
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository"

interface IRequest {
  id: string
}

export default class ShowProductService {
  
  public async execute({id}: IRequest): Promise<Endereco> {

    let enderecoRepository = getCustomRepository(EnderecoRepository);
    let endereco = await enderecoRepository.findOne(Number(id));

    if(!endereco) {
      throw new AppError(`Endreco com id: ${id} não existe`);
    }
    
    return endereco;
  }
}