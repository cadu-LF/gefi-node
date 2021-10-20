import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Pessoa from "../typeorm/Entities/Pessoa"
import PessoaRepository from "../typeorm/Repositories/PessoaRepository"

interface IRequest {
  cpf: string
}

export default class ShowPessoaService {
  
  public async execute({cpf}: IRequest): Promise<Pessoa> {

    let pessoaRepository = getCustomRepository(PessoaRepository);
    let pessoa = await pessoaRepository.findOne(cpf);

    if(!pessoa) {
      throw new AppErrors(`Pessoa com o cpf: ${cpf} não existe`);
    }
    
    return pessoa;
  }
}