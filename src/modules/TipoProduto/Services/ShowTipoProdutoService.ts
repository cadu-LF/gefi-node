import { getCustomRepository } from "typeorm"
import AppErrors from "../../../shared/errors/AppErrors"
import TipoProduto from "../typeorm/Entities/TipoProduto"
import TipoProdutoRepository from "../typeorm/Repositories/TipoProdutoRepository"

interface IRequest {
  id: string
}

export default class ShowTipoProdutoService {
  
  public async execute({id}: IRequest): Promise<TipoProduto> {

    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);
    let tipoProduto = await tipoProdutoRepository.findOne(Number(id));

    if(!tipoProduto) {
      throw new AppErrors(`Tipo de Produto com id: ${id} não existe`);
    }
    
    return tipoProduto;
  }
}