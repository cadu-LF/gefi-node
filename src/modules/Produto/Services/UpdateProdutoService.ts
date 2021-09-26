import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Produto from "../typeorm/Entities/Produto";
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository";

interface IRequest{
  codProduto: number,
  categoria: string,
  descProduto: string,
  valorProduto: number,
}

export default class UpdateProdutoService{
  public async execute({codProduto, categoria, descProduto, valorProduto}: IRequest): Promise<Produto>{
    let produtoRepository = getCustomRepository(ProdutoRepository);

    let produtoExists = await produtoRepository.findByCodigo(codProduto);

    if(!produtoExists){
      throw new AppErrors('Produto não existe');
    }
    let descricao = await produtoRepository.findByDescricao(descProduto);
    if(descricao) {
      throw new AppErrors('Já temos uma descrição identica');
    } 
    if(valorProduto < 0){
      throw new AppErrors('Valor negativo');
    }

    produtoExists.codProduto = codProduto;
    produtoExists.categoria = categoria;
    produtoExists.descProduto = descProduto;
    produtoExists.valorProduto = valorProduto;
    await produtoRepository.save(produtoExists);
    return produtoExists;
  }
}