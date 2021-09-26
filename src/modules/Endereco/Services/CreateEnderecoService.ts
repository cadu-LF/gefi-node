import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Endereco from "../typeorm/Entities/Endereco";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

interface IRequest {
  numero: number,
  rua: string,
  bairro: string,
  complemento: string
}

export default class CreateEnderecoService {

  public async execute({numero, rua, bairro, complemento}: IRequest): Promise<Endereco> {
    let enderecoRepository = getCustomRepository(EnderecoRepository);

    let ruaExist = await enderecoRepository.findByRua(rua)
    let numeroExist = await enderecoRepository.findByNumero(numero)

    if(ruaExist && numeroExist) {
      throw new AppErrors('Já temos endereço essa rua e número cadastrado');
    } 

    let newEndereco = enderecoRepository.create({
      numero, 
      rua,
      bairro,
      complemento
    })

    await enderecoRepository.save(newEndereco);

    return newEndereco;

  }
}