import { ifError } from "assert";
import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";

import Membro from "../../Membro/typeorm/Entities/Membro";
import Produto from "../../Produto/typeorm/Entities/Produto";
import Pedido from "../typeorm/Entities/Pedido";

import PedidoRepository from "../typeorm/Repositories/PedidoRepository";
import ProdutoRepository from "../../Produto/typeorm/Repositories/ProdutoRepository";
import MembroRepository from "../../Membro/typeorm/Repositories/MembroRepository";
import Usuario from "../../Usuario/typeorm/Entities/Usuario";
import UsuarioRepository from "../../Usuario/typeorm/Repositories/UsuarioRepository";

interface IRequest {
  situacao: string,
  observacao: string,
  produtos: Produto[],
  membro: Membro,
  usuario: Usuario
}

export default class CreatePedidoService {

  public async execute({situacao, observacao, produtos, membro, usuario}: IRequest): Promise<Pedido> {
    let pedidoRepository = getCustomRepository(PedidoRepository);
    let produtoRepository = getCustomRepository(ProdutoRepository);
    let membroRepository = getCustomRepository(MembroRepository);
    let usuarioRepository = getCustomRepository(UsuarioRepository);

    let valorTotal = 0;
    
    produtos.map( async (produto) => {
      let produtoExists = await produtoRepository.findByCodigo(produto.codProduto);

      if (!produtoExists) {
        throw new AppErrors('Produto inexistente');
      }
      valorTotal += produto.valorProduto;
    })

    let membroExists = await membroRepository.findByCpf(membro.cpf);

    if(membroExists) {
      throw new AppErrors('Já temos alguém com o cpf informado');
    }

    let usuarioExists = await usuarioRepository.findById(usuario.id);

    if (!usuarioExists) {
      throw new AppErrors('Usuário não encontrado');
    }

    let newPedido = pedidoRepository.create({
      situacao, 
      observacao, 
      valorTotal,
      produtos,
      membro,
      usuario
    })

    await pedidoRepository.save(newPedido);

    return newPedido;

  }
}