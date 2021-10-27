import { ifError } from "assert";
import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import TipoProduto from "../../TipoProduto/typeorm/Entities/TipoProduto";
import TipoProdutoRepository from "../../TipoProduto/typeorm/Repositories/TipoProdutoRepository";
import Produto from "../typeorm/Entities/Produto";
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository";

interface IRequest {
  codProduto: number,
  categoria: string,
  descProduto: string,
  valorProduto: number,
  tipoProduto: TipoProduto
}

export default class CreateProdutoService {

  public async execute({codProduto, categoria, descProduto, valorProduto, tipoProduto}: IRequest): Promise<Produto> {
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);

    let descricao = await produtoRepository.findByDescricao(descProduto)
    
    if(descricao) {
      throw new AppErrors('Já temos uma descrição identica');
    } 
    
    if(valorProduto < 0){
      throw new AppErrors('Valor negativo');
    }

    let tipoProdutoExists = await tipoProdutoRepository.findById(tipoProduto.id);

    if (!tipoProdutoExists) {
      throw new AppErrors('Tipo de Produto informado não existe');
    }

    let newProduto = produtoRepository.create({
      codProduto, 
      categoria, 
      descProduto, 
      valorProduto,
      tipoProduto
    })

    await produtoRepository.save(newProduto);

    return newProduto;

  }
}