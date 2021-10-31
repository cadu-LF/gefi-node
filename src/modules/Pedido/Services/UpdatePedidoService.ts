import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";

import Produto from "../../Produto/typeorm/Entities/Produto";
import Pedido from "../typeorm/Entities/Pedido";
import Membro from "../../Membro/typeorm/Entities/Membro";

import PedidoRepository from "../typeorm/Repositories/PedidoRepository";
import ProdutoRepository from "../../Produto/typeorm/Repositories/ProdutoRepository"
import MembroRepository from "../../Membro/typeorm/Repositories/MembroRepository";

interface IRequest{
  idPedido: string,
  situacao: string,
  observacao: string,
  produtos: Produto[],
  membro: Membro
}

export default class UpdatePedidoService{
  public async execute({idPedido, situacao, observacao, produtos, membro}: IRequest): Promise<Pedido>{
    let pedidoRepository = getCustomRepository(PedidoRepository);
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let membroRepository = getCustomRepository(MembroRepository);

    let pedidoExists = await pedidoRepository.findById(Number(idPedido))

    if (!pedidoExists) {
      throw new AppErrors (`Pedido com o id: ${idPedido} não existe`);
    }

    let valorTotal = 0;

    produtos.map( async (produto) => {
      let produtoExists = await produtoRepository.findByCodigo(produto.codProduto);
  
      if(!produtoExists){
        throw new AppErrors('Produto não existe');
      }

      valorTotal += produto.valorProduto;
    })

    let membroExists = await membroRepository.findByCpf(membro.cpf);

    if (!membroExists) {
      throw new AppErrors('Tipo de Produto informado não existe');
    }

    pedidoExists.situacao = situacao;
    pedidoExists.observacao = observacao;
    pedidoExists.valorTotal = valorTotal;
    pedidoExists.produtos = produtos;
    pedidoExists.membro = membro;
    await pedidoRepository.save(pedidoExists);
    return pedidoExists;
  }
}