import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Endereco from "../typeorm/Entities/Endereco";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

interface IRequest{
  id: number,
  numero: number,
  rua: string,
  bairro: string,
  complemento: string
}

export default class UpdateEnderecoService{
  public async execute({id, numero, rua, bairro, complemento}: IRequest): Promise<Endereco>{
    let enderecoRepository = getCustomRepository(EnderecoRepository);

    let enderecoExists = await enderecoRepository.findOne(id);

    if(!enderecoExists){
      throw new AppError('Endereco não existe');
    }

    let endrecoMesmaRua = await enderecoRepository.findByRua(rua);

    let enderecoMesmoNumero = await enderecoRepository.findByNumero(numero);

    if(endrecoMesmaRua && enderecoMesmoNumero){
      throw new AppError('Endereço já existente');
    }

    enderecoExists.numero = numero;
    enderecoExists.rua = rua;
    enderecoExists.bairro = bairro;
    enderecoExists.complemento = complemento;
    await enderecoRepository.save(enderecoExists);
    return enderecoExists;
  }
}