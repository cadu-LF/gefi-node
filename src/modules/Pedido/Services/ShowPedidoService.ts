import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Pedido from "../typeorm/Entities/Pedido";
import PedidoRepository from "../typeorm/Repositories/PedidoRepository";

interface IRequest {
  idPedido: string
}

export default class ShowPedidoService {
  
  public async execute({idPedido}: IRequest): Promise<Pedido> {

    let pedidoRepository = getCustomRepository(PedidoRepository);
    let pedido = await pedidoRepository.findById(Number(idPedido));

    if(!pedido) {
      throw new AppErrors(`Pedido com o id: ${idPedido} não existe`);
    }
    
    return pedido;
  }
}