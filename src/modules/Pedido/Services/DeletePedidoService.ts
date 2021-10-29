import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import PedidoRepository from "../typeorm/Repositories/PedidoRepository";

interface IRequest {
  idPedido: string
}

export default class DeletePedidoService {

  public async execute({idPedido}: IRequest): Promise<void> {

    let pedidoRepository = getCustomRepository(PedidoRepository);

    let pedido = await pedidoRepository.findById(Number(idPedido));

    if(!pedido) {
      throw new AppErrors(`Pedido com o id: ${idPedido} não existe`);
    }
    
    await pedidoRepository.remove(pedido);
  }
}