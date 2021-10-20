import { Request, Response } from "express";

import CreateTipoProdutoService from '../Services/CreateTipoProdutoService'
import DeleteTipoProdutoService from '../Services/DeleteTipoProdutoService'
import ListTipoProdutoService from '../Services/ListTipoProdutoService'
import ShowTipoProdutoService from '../Services/ShowTipoProdutoService'
import UpdateTipoProdutoService from '../Services/UpdateTipoProdutoService'

export default class TipoProdutoController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {descricao} = request.body
    let createTipoProduto = new CreateTipoProdutoService()
    let newTipoProduto = await createTipoProduto.execute({
      descricao
    })

    return response.json(newTipoProduto);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let deleteTipoProduto = new DeleteTipoProdutoService();
    await deleteTipoProduto.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listTipoProduto = new ListTipoProdutoService();
    let tiposProdutos = await listTipoProduto.execute()

    return response.json(tiposProdutos)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showTipoProduto = new ShowTipoProdutoService();
    let tipoProduto = await showTipoProduto.execute({ id })

    return response.json(tipoProduto)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params

    let { descricao } = request.body
    let updateService = new UpdateTipoProdutoService();
    let tipoProduto = await updateService.execute({id, descricao})

    return response.json(tipoProduto)
  }
}