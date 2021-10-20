import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import TipoProduto from "../typeorm/Entities/TipoProduto";
import TipoProdutoRepository from "../typeorm/Repositories/TipoProdutoRepository";

interface IRequest {
  descricao: string
}

export default class CreateTipoProdutoService {

  public async execute({descricao}: IRequest): Promise<TipoProduto> {
    let tipoProdutoRepository = getCustomRepository(TipoProdutoRepository);

    let decricaoExist = await tipoProdutoRepository.findByDescricao(descricao)

    if(decricaoExist) {
      throw new AppErrors('Já temos tipo de produto com essa descrição cadastrado');
    } 

    let newTipoProduto = tipoProdutoRepository.create({
      descricao
    })

    await tipoProdutoRepository.save(newTipoProduto);

    return newTipoProduto;

  }
}