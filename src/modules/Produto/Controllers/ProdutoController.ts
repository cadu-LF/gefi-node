import { Request, Response } from "express";

import CreateProdutoService from '../Services/CreateProdutoService'
import DeleteProdutoService from '../Services/DeleteProdutoService'
import ListProdutoService from '../Services/ListProdutoService'
import ShowProdutoService from '../Services/ShowProdutoService'
import UpdateProdutoService from '../Services/UpdateProdutoService'

export default class ProdutoController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {codProduto, categoria, descProduto, valorProduto} = request.body
    let createProduto = new CreateProdutoService()
    let newProduto = await createProduto.execute({
      codProduto,
      categoria,
      descProduto,
      valorProduto
    })

    return response.json(newProduto);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { codProduto } = request.params;
    let deleteProduto = new DeleteProdutoService();
    await deleteProduto.execute({ codProduto })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listProduto = new ListProdutoService();
    let produtos = await listProduto.execute()

    return response.json(produtos)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { codProduto } = request.params
    let showProduto = new ShowProdutoService();
    let produto = await showProduto.execute({ codProduto })

    return response.json(produto)
  }

  public async update(request: Request, response: Response): Promise<Response> {

    let {codProduto, categoria, descProduto, valorProduto} = request.body
    let updateService = new UpdateProdutoService();
    let produto = await updateService.execute({
      codProduto,
      categoria,
      descProduto,
      valorProduto
    })

    return response.json(produto)
  }
}