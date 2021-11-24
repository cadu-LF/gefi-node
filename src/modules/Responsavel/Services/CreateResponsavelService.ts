import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import CreatePessoaService from "../../Pessoas/Services/CreatePessoaService";
import Responsavel from "../typeorm/Entities/Responsavel";
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository";

interface IRequestEndereco {
  id: string;
}

interface IRequestPessoa {
  cpf: string;
  nome: string;
  dataNascimento: Date;
  sexo: string;
  email: string;
  idEndereco: IRequestEndereco;
}

interface IRequest {
  pessoa: IRequestPessoa;
  voluntario: boolean
}

export default class CreateResponsavelService {

  public async execute({pessoa, voluntario}: IRequest): Promise<Responsavel> {
    let responsavelReposiory = getCustomRepository(ResponsavelRepository);
    let createPessoa = new CreatePessoaService();
    let pessoaRespose = await createPessoa.execute(pessoa);

    let responsavelExists = await responsavelReposiory.findByCpf(pessoaRespose.cpf)

    if(responsavelExists) {
      throw new AppErrors('Já temos alguém com o cpf informado');
    } 

    let emailExists = await responsavelReposiory.findByEmail(pessoaRespose.email)

    if(emailExists) {
      throw new AppErrors('Já temos alguém com o email informado');
    } 

    let newResponsavel = responsavelReposiory.create({
      pessoa,
      voluntario
    })

    await responsavelReposiory.save(newResponsavel);

    return newResponsavel;

  }
}