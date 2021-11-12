import { Request, Response } from "express";

import CreatePedidoService from '../Services/CreatePedidoService';
import DeletePedidoService from '../Services/DeletePedidoService';
import ListPedidoService from '../Services/ListPedidoService';
import ShowPedidoService from '../Services/ShowPedidoService';
import UpdatePedidoService from '../Services/UpdatePedidoService';

export default class PedidoController {
  public async create(request: Request, response: Response): Promise<Response> {

    let { situacao, observacao, produtos, membro} = request.body;
    let createPedido = new CreatePedidoService()
    let newPedido = await createPedido.execute({
      situacao,
      observacao,
      produtos,
      membro
    })

    return response.json(newPedido);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { idPedido } = request.params;
    let deletePedido = new DeletePedidoService();
    await deletePedido.execute({ idPedido });

    return response.json([]);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listPedido = new ListPedidoService();
    let pedidos = await listPedido.execute();

    return response.json(pedidos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { idPedido } = request.params;
    let showPedido = new ShowPedidoService();
    let pedido = await showPedido.execute({ idPedido });

    return response.json(pedido);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    let {idPedido} = request.params;
    let { situacao, observacao, produtos, membro} = request.body;
    let updateService = new UpdatePedidoService();
    let pedido = await updateService.execute({
      idPedido,
      situacao,
      observacao,
      produtos,
      membro
    })

    return response.json(pedido);
  }
}