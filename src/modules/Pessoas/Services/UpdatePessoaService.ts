import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Pessoa from "../typeorm/Entities/Pessoa";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequest{
  id: string;
  cpf: string;
  nome: string;
  idade: number;
  sexo: string;
  email: string;
}

export default class UpdatePessoaService{
  public async execute({id, cpf, nome, idade, sexo, email}: IRequest): Promise<Pessoa>{
    let pessoaRepository = getCustomRepository(PessoaRepository);

    let pessoaExists = await pessoaRepository.findOne(id);

    if(!pessoaExists){
      throw new AppErrors(`Pessoa com id: ${id} não existe`);
    }

    let pessoaMesmoEmail = await pessoaRepository.findByEmail(email);

    if(pessoaMesmoEmail){
      throw new AppErrors('Pessoa com esse email já foi cadastrada');
    }

    let pessoaMesmoCpf = await pessoaRepository.findByCpf(cpf);

    if(pessoaMesmoCpf){
      throw new AppErrors('Pessoa com esse cpf já foi cadastrada');
    }

    pessoaExists.cpf = cpf;
    pessoaExists.nome = nome;
    pessoaExists.idade = idade;
    pessoaExists.sexo = sexo;
    pessoaExists.email = email;
    await pessoaRepository.save(pessoaExists);
    return pessoaExists;
  }
}