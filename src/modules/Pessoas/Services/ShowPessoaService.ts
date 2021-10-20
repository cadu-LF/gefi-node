import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Pessoa from "../typeorm/Entities/Pessoa"
import PessoaRepository from "../typeorm/Repositories/PessoaRepository"

interface IRequest {
  id: string
}

export default class ShowPessoaService {
  
  public async execute({id}: IRequest): Promise<Pessoa> {

    let pessoaRepository = getCustomRepository(PessoaRepository);
    let pessoa = await pessoaRepository.findOne(Number(id));

    if(!pessoa) {
      throw new AppErrors(`Pessoa com o cpf: ${id} não existe`);
    }
    
    return pessoa;
  }
}