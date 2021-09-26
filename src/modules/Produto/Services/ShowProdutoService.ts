import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import Produto from "../typeorm/Entities/Produto"
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository"

interface IRequest {
  codProduto: string
}

export default class ShowProductService {
  
  public async execute({codProduto}: IRequest): Promise<Produto> {

    let produtoRepository = getCustomRepository(ProdutoRepository);
    let produto = await produtoRepository.findByCodigo(Number(codProduto));

    if(!produto) {
      throw new AppErrors(`Produto com esse código: ${codProduto} não existe`);
    }
    
    return produto;
  }
}