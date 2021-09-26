import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import EnderecoRepository from "../typeorm/Repositories/EnderecoRepository";

interface IRequest {
  id: string
}

export default class DeleteEnderecoService {

  public async execute({ id }: IRequest): Promise<void> {

    let enderecoRepository = getCustomRepository(EnderecoRepository);

    let endereco = await enderecoRepository.findOne(Number(id));

    if(!endereco) {
      throw new AppErrors(`Endereço com id: ${id} não existe`);
    }
    
    await enderecoRepository.remove(endereco);
  }
}