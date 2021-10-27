import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Responsavel from "../../Responsavel/typeorm/Entities/Responsavel";
import ResponsavelRepository from "../../Responsavel/typeorm/Repositories/ResponsavelRepository";
import Sessao from "../../Sessoes/typeorm/Entities/Sessao";
import SessaoRepository from "../../Sessoes/typeorm/Repositories/SessaoRepository";
import Membro from "../typeorm/Entities/Membro";
import MembroRepository from "../typeorm/Repositories/MembroRepository";

interface IRequest{
  id: string,
  cpf: string,
  nome: string,
  idade: number,
  sexo: string,
  email: string,
  nroRegistro: number,
  vencimentoRegistro: Date,
  sessao: Sessao,
  responsavel: Responsavel,
  irmaos: Membro[]
}

export default class UpdateMembroService{
  public async execute({id, cpf, nome, idade, sexo, email, nroRegistro, vencimentoRegistro, sessao, responsavel, irmaos}: IRequest): Promise<Membro>{
    let membroRepository = getCustomRepository(MembroRepository);
    let sessaoRepository = getCustomRepository(SessaoRepository);
    let responsavelRepository = getCustomRepository(ResponsavelRepository)

    let membroExists = await membroRepository.findOne(Number(id));

    if(!membroExists){
      throw new AppErrors('Não há membro com o id informado');
    }
    
    let emailExists = await membroRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('Email informado já está cadastrado');
    }

    let cpfExists = await membroRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new AppErrors('Cpf informado já está cadastrado');
    }

    let nroRegistroExists = await membroRepository.findByNroRegistro(nroRegistro);

    if (nroRegistroExists) {
      throw new AppErrors('Número de Registro informado já está cadastrado');
    }

    let sessaoExists = await sessaoRepository.findById(sessao.id)

    if (!sessaoExists) {
      throw new AppErrors('Sessão informada não existe');
    }

    let responsavelExists = await responsavelRepository.findById(responsavel.id);

    if (!responsavelExists) {
      throw new AppErrors('Responsável informado não existe');
    }

    irmaos.forEach( async (irmao) => {
      let irmaoExists = await membroRepository.findByNroRegistro(irmao.nroRegistro)

      if (!irmaoExists) {
        throw new AppErrors('Irmão informado não está cadastrado como membro')
      }
    })

    membroExists.cpf = cpf;
    membroExists.nome = nome;
    membroExists.idade = idade;
    membroExists.sexo = sexo;
    membroExists.email = email;
    membroExists.nroRegistro = nroRegistro;
    membroExists.vencimentoRegistro = vencimentoRegistro;
    membroExists.sessao = sessao;
    membroExists.responsavel = responsavel;
    membroExists.irmaos = irmaos;
    await membroRepository.save(membroExists)
    
    return membroExists;
  }
}