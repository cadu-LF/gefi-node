import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository";

interface IRequest {
  id: string,

}

export default class DeleteResponsavelService {

  public async execute({id}: IRequest): Promise<void> {

    let responsavelRepository = getCustomRepository(ResponsavelRepository);

    let responsavel = await responsavelRepository.findOne(Number(id));

    if(!responsavel) {
      throw new AppErrors(`Não há ninguém com o id: ${id}`);
    }
    
    await responsavelRepository.remove(responsavel);
  }
}