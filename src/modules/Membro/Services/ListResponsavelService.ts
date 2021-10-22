import { getCustomRepository } from "typeorm";
import Responsavel from "../typeorm/Entities/Responsavel";
import ResponsavelRepository from "../typeorm/Repositories/ResponsavelRepository";

export default class ListResponsavelService {
  
  public async execute(): Promise<Responsavel[]> {

    let responsavelRepository = getCustomRepository(ResponsavelRepository);
    let responsavel = await responsavelRepository.find();
    
    return responsavel;
  }
}