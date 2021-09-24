import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import SessaoRepository from "../typeorm/Repositories/SessaoRepository";

interface IRequest {
  id: string
}

export default class DeleteSessaoService {

  public async execute({ id }: IRequest): Promise<void> {

    let sessaoRepository = getCustomRepository(SessaoRepository);

    let sessao = await sessaoRepository.findOne(Number(id));

    if(!sessao) {
      throw new AppErrors(`Sessão com id: ${id} não existe`);
    }
    
    await sessaoRepository.remove(sessao);
  }
}