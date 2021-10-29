import { ifError } from "assert";
import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";

import Membro from "../../Membro/typeorm/Entities/Membro";
import Produto from "../../Produto/typeorm/Entities/Produto";
import Pedido from "../typeorm/Entities/Pedido";

import PedidoRepository from "../typeorm/Repositories/PedidoRepository";
import ProdutoRepository from "../../Produto/typeorm/Repositories/ProdutoRepository"
import MembroRepository from "../../Membro/typeorm/Repositories/MembroRepository";

interface IRequest {
  situacao: string,
  observacao: string,
  produtos: Produto[],
  membro: Membro
}

export default class CreatePedidoService {

  public async execute({situacao, observacao, produtos, membro}: IRequest): Promise<Pedido> {
    let pedidoRepository = getCustomRepository(PedidoRepository);
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let membroRepository = getCustomRepository(MembroRepository);

    let valorTotal = 0;
    
    produtos.map( async (produto) => {
      let produtoExists = await produtoRepository.findByCodigo(produto.codProduto);

      if (!produtoExists) {
        throw new AppErrors('Produto inexistente');
      }
      valorTotal += produto.valorProduto;
    })

    let membroExists = await membroRepository.findByCpf(membro.cpf)

    if(membroExists) {
      throw new AppErrors('Já temos alguém com o cpf informado');
    }

    let newPedido = pedidoRepository.create({
      situacao, 
      observacao, 
      valorTotal,
      produtos,
      membro
    })

    await pedidoRepository.save(newPedido);

    return newPedido;

  }
}