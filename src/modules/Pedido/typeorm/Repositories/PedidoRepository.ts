import { EntityRepository, Repository } from "typeorm";
import Pedido from "../Entities/Pedido";

@EntityRepository(Pedido)
export default class PedidoRepository extends Repository<Pedido>{
  /**
   * Busca Pedido pelo id
   * @param number: idPedido
   * @return Promise<Pedido | undefined>
   */
  public async findById(idPedido: number): Promise<Pedido | undefined> {
    
    const pedido = await this.findOne({
      where: { 
        idPedido
      }
    })

    return pedido;
  }
}