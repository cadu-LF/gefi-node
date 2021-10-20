import { getCustomRepository } from "typeorm";
import Pessoa from "../typeorm/Entities/Pessoa";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

export default class ListPessoaService {
  
  public async execute(): Promise<Pessoa[]> {

    let pessoaRepository = getCustomRepository(PessoaRepository);
    let pessoas = await pessoaRepository.find();
    
    return pessoas;
  }
}