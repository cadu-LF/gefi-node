import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Responsavel from "../typeorm/Entities/Responsavel";
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository";

interface IRequest {
  cpf: string,
  nome: string,
  idade: number,
  sexo: string,
  email: string,
  voluntario: boolean
}

export default class CreateResponsavelService {

  public async execute({cpf, nome, idade, sexo, email, voluntario}: IRequest): Promise<Responsavel> {
    let responsavelReposiory = getCustomRepository(ResponsavelRepository);

    let responsavelExists = await responsavelReposiory.findByCpf(cpf)

    if(responsavelExists) {
      throw new AppErrors('Já temos alguém com o cpf informado');
    } 

    let emailExists = await responsavelReposiory.findByEmail(email)

    if(emailExists) {
      throw new AppErrors('Já temos alguém com o email informado');
    } 

    let newResponsavel = responsavelReposiory.create({
      cpf, 
      nome, 
      idade, 
      sexo, 
      email,
      voluntario
    })

    await responsavelReposiory.save(newResponsavel);

    return newResponsavel;

  }
}