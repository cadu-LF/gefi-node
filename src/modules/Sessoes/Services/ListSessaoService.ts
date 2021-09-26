import { getCustomRepository } from "typeorm";
import Sessao from "../typeorm/Entities/Sessao";
import SessaoRepository from "../typeorm/Repositories/SessaoRepository";

export default class ListSessaoService {
  
  public async execute(): Promise<Sessao[]> {

    let sessaoRepository = getCustomRepository(SessaoRepository);
    let sessoes = await sessaoRepository.find();
    
    return sessoes;
  }
}