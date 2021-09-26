import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository";

interface IRequest {
  codProduto: string
}

export default class DeleteProductService {

  public async execute({codProduto}: IRequest): Promise<void> {

    let produtoRepository = getCustomRepository(ProdutoRepository);

    let produto = await produtoRepository.findByCodigo(Number(codProduto));

    if(!produto) {
      throw new AppErrors(`Produto com esse código: ${codProduto} não existe`);
    }
    
    await produtoRepository.remove(produto);
  }
}