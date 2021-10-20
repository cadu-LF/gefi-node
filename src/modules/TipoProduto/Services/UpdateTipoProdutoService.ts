import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import TipoProduto from "../typeorm/Entities/TipoProduto";
import TipoProdutoRepository from "../typeorm/Repositories/TipoProdutoRepository";

interface IRequest{
  id: string,
  descricao: string
}

export default class UpdateTipoProdutoService{
  public async execute({id, descricao}: IRequest): Promise<TipoProduto>{
    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);

    let tipoProdutoExists = await tipoProdutoRepository.findOne(Number(id));

    if(!tipoProdutoExists){
      throw new AppErrors(`Tipo de Produto com id: ${id} não existe`);
    }

    let tipoProdutoMesmaDescricao = await tipoProdutoRepository.findByDescricao(descricao);

    if(tipoProdutoMesmaDescricao){
      throw new AppErrors('Tipo de Produto já existente');
    }

    tipoProdutoExists.descricao = descricao;
    await tipoProdutoRepository.save(tipoProdutoExists);
    return tipoProdutoExists;
  }
}