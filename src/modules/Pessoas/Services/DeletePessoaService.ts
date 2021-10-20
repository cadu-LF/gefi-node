import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequest {
  id: string
}

export default class DeletePessoaService {

  public async execute({ id }: IRequest): Promise<void> {

    let pessoaRepository = getCustomRepository(PessoaRepository);

    let pessoa = await pessoaRepository.findOne(Number(id));

    if(!pessoa) {
      throw new AppErrors(`Pessoa com id: ${id} não existe`);
    }
    
    await pessoaRepository.remove(pessoa);
  }
}