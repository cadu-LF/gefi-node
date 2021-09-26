import { getCustomRepository } from "typeorm";
import Produto from "../typeorm/Entities/Produto";
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository";

export default class ListProductService {
  
  public async execute(): Promise<Produto[]> {

    let produtoRepository = getCustomRepository(ProdutoRepository);
    let produtos = await produtoRepository.find();
    
    return produtos;
  }
}