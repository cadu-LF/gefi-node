import { getCustomRepository } from "typeorm";
import Pedido from "../typeorm/Entities/Pedido";
import PedidoRepository from "../typeorm/Repositories/PedidoRepository";

export default class ListPedidoService {
  
  public async execute(): Promise<Pedido[]> {

    let pedidoRepository = getCustomRepository(PedidoRepository);
    let pedidos = await pedidoRepository.find();
    
    return pedidos;
  }
}