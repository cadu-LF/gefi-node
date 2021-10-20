import { getCustomRepository } from "typeorm";
import TipoProduto from "../typeorm/Entities/TipoProduto";
import TipoProdutoRepository from "../typeorm/Repositories/TipoProdutoRepository";

export default class ListTipoProdutoService {
  
  public async execute(): Promise<TipoProduto[]> {

    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);
    let tiposProdutos = await tipoProdutoRepository.find();
    
    return tiposProdutos;
  }
}