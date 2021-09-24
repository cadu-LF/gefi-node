import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Sessao from "../typeorm/Entities/Sessao";
import SessaoRepository from "../typeorm/Repositories/SessaoRepository";

interface IRequest {
  nome: string,
  qtdeMembros: number
}

export default class CreateSessaoService {

  public async execute({nome, qtdeMembros}: IRequest): Promise<Sessao> {
    let sessaoReposiory = getCustomRepository(SessaoRepository);

    let nomeExist = await sessaoReposiory.findByNome(nome)

    if(nomeExist) {
      throw new AppErrors('Já temos sessão com esse nome cadastrada');
    } 

    let newSessao = sessaoReposiory.create({
      nome,
      qtdeMembros
    })

    await sessaoReposiory.save(newSessao);

    return newSessao;

  }
}