import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequest {
  cpf: string
}

export default class DeletePessoaService {

  public async execute({ cpf }: IRequest): Promise<void> {

    let pessoaRepository = getCustomRepository(PessoaRepository);

    let pessoa = await pessoaRepository.findOne(cpf);

    if(!pessoa) {
      throw new AppErrors(`Pessoa com cpf: ${cpf} não existe`);
    }
    
    await pessoaRepository.remove(pessoa);
  }
}