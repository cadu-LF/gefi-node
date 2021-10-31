import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";

import Produto from "../../Produto/typeorm/Entities/Produto";
import Pedido from "../typeorm/Entities/Pedido";
import Membro from "../../Membro/typeorm/Entities/Membro";

import PedidoRepository from "../typeorm/Repositories/PedidoRepository";
import ProdutoRepository from "../../Produto/typeorm/Repositories/ProdutoRepository"
import MembroRepository from "../../Membro/typeorm/Repositories/MembroRepository";
import Usuario from "../../Usuario/typeorm/Entities/Usuario";
import UsuarioRepository from "../../Usuario/typeorm/Repositories/UsuarioRepository";

interface IRequest{
  idPedido: string,
  situacao: string,
  observacao: string,
  produtos: Produto[],
  membro: Membro,
  usuario: Usuario
}

export default class UpdatePedidoService{
  public async execute({idPedido, situacao, observacao, produtos, membro, usuario}: IRequest): Promise<Pedido>{
    let pedidoRepository = getCustomRepository(PedidoRepository);
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let membroRepository = getCustomRepository(MembroRepository);
    let usuarioRepository = getCustomRepository(UsuarioRepository);

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

    let usuarioExists = await usuarioRepository.findById(usuario.id);

    if (!usuarioExists) {
      throw new AppErrors('Usuário não encontrado');
    }

    pedidoExists.situacao = situacao;
    pedidoExists.observacao = observacao;
    pedidoExists.valorTotal = valorTotal;
    pedidoExists.produtos = produtos;
    pedidoExists.membro = membro;
    pedidoExists.usuario = usuario;
    await pedidoRepository.save(pedidoExists);
    return pedidoExists;
  }
}