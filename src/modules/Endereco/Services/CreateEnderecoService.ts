import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Endereco from "../typeorm/Entities/Endereco";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

interface IRequest {
  numero: number,
  rua: string,
  bairro: string,
  complemento: string,
}

export default class CreateProductService {

  public async execute({numero, rua, bairro, complemento}: IRequest): Promise<Endereco> {
    let enderecoReposiory = getCustomRepository(EnderecoRepository);

    let ruaExist = await enderecoReposiory.findByRua(rua)
    let numeroExist = await enderecoReposiory.findByNumero(numero)

    if(ruaExist && numeroExist) {
      throw new AppErrors('Já temos endereço essa rua e número cadastrado');
    } 

    let newEndereco = enderecoReposiory.create({
      numero, 
      rua,
      bairro,
      complemento
    })

    await enderecoReposiory.save(newEndereco);

    return newEndereco;

  }
}