import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Responsavel from "../../Responsavel/typeorm/Entities/Responsavel";
import ResponsavelRepository from "../../Responsavel/typeorm/Repositories/ResponsavelRepository";
import Sessao from "../../Sessoes/typeorm/Entities/Sessao";
import SessaoRepository from "../../Sessoes/typeorm/Repositories/SessaoRepository";
import Membro from "../typeorm/Entities/Membro";
import MembroRepository from "../typeorm/Repositories/MembroRepository";

interface IRequest {
  cpf: string,
  nome: string,
  idade: number,
  sexo: string,
  email: string,
  nroRegistro: number,
  vencimentoRegistro: Date
  sessao: Sessao,
  responsavel: Responsavel,
  irmaos: Membro[]
}

export default class CreateMembroService {

  public async execute({cpf, nome, idade, sexo, email, nroRegistro, vencimentoRegistro, sessao, responsavel, irmaos}: IRequest): Promise<Membro> {
    let membroRepository = getCustomRepository(MembroRepository);
    let sessaoRepository = getCustomRepository(SessaoRepository);
    let responsavelRepository = getCustomRepository(ResponsavelRepository);

    let membroExists = await membroRepository.findByCpf(cpf)

    if(membroExists) {
      throw new AppErrors('Já temos alguém com o cpf informado');
    }

    let nroRegistroResponse = await membroRepository.findByNroRegistro(nroRegistro);

    if(nroRegistroResponse){
      throw new AppErrors('Já temos alguém com esse número de registro');
    }

    let sessaoExists = await sessaoRepository.findById(sessao.id)

    if(!sessaoExists) {
      throw new AppErrors('Sessão informada não encontrada')
    }

    let responsavelExists = await responsavelRepository.findById(responsavel.id);

    if(!responsavelExists) {
      throw new AppErrors('Responsável não encontrado');
    }

    let emailExists = await membroRepository.findByEmail(email)

    if(emailExists) {
      throw new AppErrors('Já temos alguém com o email informado');
    }

    if (!irmaos){
      irmaos = []
    }

    let newMembro = await membroRepository.create({
      cpf,
      nome,
      idade,
      sexo,
      email,
      nroRegistro,
      vencimentoRegistro,
      sessao,
      responsavel,
      irmaos
    })

    await membroRepository.save(newMembro);

    return newMembro;
  }
}