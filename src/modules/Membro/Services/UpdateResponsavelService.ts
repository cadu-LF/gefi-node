import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Responsavel from "../typeorm/Entities/Responsavel";
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository";

interface IRequest{
  id: string,
  cpf: string,
  nome: string,
  idade: number,
  sexo: string,
  email: string,
  voluntario: boolean
}

export default class UpdateResponsavelService{
  public async execute({id, cpf, nome, idade, sexo, email, voluntario}: IRequest): Promise<Responsavel>{
    let responsavelRepository = getCustomRepository(ResponsavelRepository);

    let responsavelExists = await responsavelRepository.findOne(Number(id));

    if(!responsavelExists){
      throw new AppErrors('Não há responsável com o cpf informado');
    }
    
    let emailExists = await responsavelRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('Email informado já está cadastrado');
    }

    responsavelExists.cpf = cpf;
    responsavelExists.nome = nome;
    responsavelExists.idade = idade;
    responsavelExists.sexo = sexo;
    responsavelExists.email = email;
    responsavelExists.voluntario = voluntario;
    await responsavelRepository.save(responsavelExists)
    
    return responsavelExists;
  }
}