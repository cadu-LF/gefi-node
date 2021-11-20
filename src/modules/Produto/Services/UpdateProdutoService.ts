import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import TipoProduto from "../../TipoProduto/typeorm/Entities/TipoProduto";
import TipoProdutoRepository from "../../TipoProduto/typeorm/Repositories/TipoProdutoRepository";
import Produto from "../typeorm/Entities/Produto";
import ProdutoRepository from "../typeorm/Repositories/ProdutoRepository";

interface IRequest{
  codProduto: string,
  descProduto: string,
  valorProduto: number,
  tipoProduto: TipoProduto
}

export default class UpdateProdutoService{
  public async execute({codProduto, descProduto, valorProduto, tipoProduto}: IRequest): Promise<Produto>{
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);

    let produtoExists = await produtoRepository.findByCodigo(Number (codProduto));

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

    let tipoProdutoExists = await tipoProdutoRepository.findById(tipoProduto.id);

    if (!tipoProdutoExists) {
      throw new AppErrors('Tipo de Produto informado não existe');
    }

    produtoExists.codProduto = Number (codProduto);
    produtoExists.descProduto = descProduto;
    produtoExists.valorProduto = valorProduto;
    produtoExists.tipoProduto = tipoProduto;
    await produtoRepository.save(produtoExists);
    return produtoExists;
  }
}