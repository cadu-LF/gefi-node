import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Pessoa from "../typeorm/Entities/Pessoa";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequest {
  cpf: string;
  nome: string;
  idade: number;
  sexo: string;
  email: string;
}

export default class CreatePessoaService {

  public async execute({cpf, nome, idade, sexo, email}: IRequest): Promise<Pessoa> {
    let pessoaRepository = getCustomRepository(PessoaRepository);

    let emailExist = await pessoaRepository.findByEmail(email);

    if(emailExist) {
      throw new AppErrors('Já temos alguém com esse email cadastrado');
    } 

    let newPessoa = pessoaRepository.create({
      cpf,
      nome,
      idade,
      sexo,
      email
    })

    await pessoaRepository.save(newPessoa);

    return newPessoa;
  }
}