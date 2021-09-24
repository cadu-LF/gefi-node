import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Sessao from "../typeorm/Entities/Sessao";
import SessaoRepository from "../typeorm/Repositories/SessaoRepository";

interface IRequest{
  id: string,
  nome: string,
  qtdeMembros: number
}

export default class UpdateSessaoService{
  public async execute({id, nome, qtdeMembros}: IRequest): Promise<Sessao>{
    let sessaoRepository = getCustomRepository(SessaoRepository);

    let sessaoExists = await sessaoRepository.findOne(Number(id));

    if(!sessaoExists){
      throw new AppErrors('Sessão não existe');
    }

    let sessaoMesmoNome = await sessaoRepository.findByNome(nome);

    if(sessaoMesmoNome){
      throw new AppErrors('Sessão já existente');
    }

    sessaoExists.nome = nome;
    sessaoExists.qtdeMembros = qtdeMembros;

    await sessaoRepository.save(sessaoExists);
    return sessaoExists;
  }
}