import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import TipoProdutoRepository from "../typeorm/Repositories/TipoProdutoRepository";

interface IRequest {
  id: string
}

export default class DeleteTipoProdutoService {

  public async execute({ id }: IRequest): Promise<void> {

    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);

    let tipoProduto = await tipoProdutoRepository.findOne(Number(id));

    if(!tipoProduto) {
      throw new AppErrors(`Tipo de Produto com id: ${id} não existe`);
    }
    
    await tipoProdutoRepository.remove(tipoProduto);
  }
}