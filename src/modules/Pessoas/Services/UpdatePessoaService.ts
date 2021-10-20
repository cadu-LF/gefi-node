import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Pessoa from "../typeorm/Entities/Pessoa";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequest{
  cpf: string;
  nome: string;
  idade: number;
  sexo: string;
  email: string;
}

export default class UpdatePessoaService{
  public async execute({cpf, nome, idade, sexo, email}: IRequest): Promise<Pessoa>{
    let pessoaRepository = getCustomRepository(PessoaRepository);

    let pessoaExists = await pessoaRepository.findOne(cpf);

    if(!pessoaExists){
      throw new AppErrors(`Pessoa com cpf: ${cpf} não existe`);
    }

    let pessoaMesmoEmail = await pessoaRepository.findByEmail(email);

    if(pessoaMesmoEmail){
      throw new AppErrors('Pessoa com esse email já foi cadastrada');
    }

    pessoaExists.nome = nome;
    pessoaExists.idade = idade;
    pessoaExists.sexo = sexo;
    pessoaExists.email = email;
    await pessoaRepository.save(pessoaExists);
    return pessoaExists;
  }
}