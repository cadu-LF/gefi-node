import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Endereco from "../typeorm/Entities/Endereco";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

interface IRequest{
  id: string,
  numero: number,
  rua: string,
  bairro: string,
  complemento: string
}

export default class UpdateEnderecoService{
  public async execute({id, numero, rua, bairro, complemento}: IRequest): Promise<Endereco>{
    let enderecoRepository = getCustomRepository(EnderecoRepository);

    let enderecoExists = await enderecoRepository.findOne(Number(id));

    if(!enderecoExists){
      throw new AppErrors(`Endereço com id: ${id} não existe`);
    }

    let endrecoMesmaRua = await enderecoRepository.findByRua(rua);
    let enderecoMesmoNumero = await enderecoRepository.findByNumero(numero);

    if(endrecoMesmaRua && enderecoMesmoNumero){
      throw new AppErrors('Endereço já existente');
    }

    enderecoExists.numero = numero;
    enderecoExists.rua = rua;
    enderecoExists.bairro = bairro;
    enderecoExists.complemento = complemento;
    await enderecoRepository.save(enderecoExists);
    return enderecoExists;
  }
}