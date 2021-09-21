import { getCustomRepository } from "typeorm";
import Endereco from "../typeorm/Entities/Endereco";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

export default class ListProductService {
  
  public async execute(): Promise<Endereco[]> {

    let enderecoRepository = getCustomRepository(EnderecoRepository);
    let enderecos = await enderecoRepository.find();
    
    return enderecos;
  }
}