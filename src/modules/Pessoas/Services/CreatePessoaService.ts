import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import ShowEnderecoService from "../../Endereco/Services/ShowEnderecoService";
import Pessoa from "../typeorm/Entities/Pessoa";
import PessoaRepository from "../typeorm/Repositories/PessoaRepository";

interface IRequestEndereco {
  id: string
}

interface IRequestPessoa {
  cpf: string;
  nome: string;
  dataNascimento: Date;
  sexo: string;
  email: string;
  idEndereco: IRequestEndereco
}

export default class CreatePessoaService {

  public async execute({cpf, nome, dataNascimento, sexo, email, idEndereco}: IRequestPessoa, ): Promise<Pessoa> {
    let pessoaRepository = getCustomRepository(PessoaRepository);
    let showEndereco = new ShowEnderecoService();
    console.log('createpessoaService')
    let endereco = await showEndereco.execute(idEndereco)

    let emailExist = await pessoaRepository.findByEmail(email);

    console.log(endereco)
    if(emailExist) {
      throw new AppErrors('Já temos alguém com esse email cadastrado');
    } 

    let newPessoa = pessoaRepository.create({
      cpf,
      nome,
      dataNascimento,
      sexo,
      email,
      endereco
    })

    await pessoaRepository.save(newPessoa);

    return newPessoa;
  }
}