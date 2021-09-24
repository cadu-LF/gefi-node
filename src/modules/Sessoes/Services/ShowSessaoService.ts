import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Sessao from "../typeorm/Entities/Sessao"
import SessaoRepository from "../typeorm/Repositories/SessaoRepository"

interface IRequest {
  id: string
}

export default class ShowSessaoService {
  
  public async execute({id}: IRequest): Promise<Sessao> {

    let sessaoRepository = getCustomRepository(SessaoRepository);
    let sessao = await sessaoRepository.findOne(Number(id));

    if(!sessao) {
      throw new AppErrors(`Sessão com id: ${id} não existe`);
    }
    
    return sessao;
  }
}