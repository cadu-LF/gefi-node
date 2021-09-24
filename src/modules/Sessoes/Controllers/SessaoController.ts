import { Request, Response } from "express";
import CreateSessaoService from "../Services/CreateSessaoService";
import DeleteSessaoService from "../Services/DeleteSessaoService";
import ListSessaoService from "../Services/ListSessaoService";
import ShowSessaoService from "../Services/ShowSessaoService";
import UpdateSessaoService from "../Services/UpdateSessaoService";

export default class SessaoController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {nome, qtdeMembros} = request.body
    let createSessao = new CreateSessaoService()
    let newSessao = await createSessao.execute({
      nome, 
      qtdeMembros
    })

    return response.json(newSessao);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let deleteSessao = new DeleteSessaoService();
    await deleteSessao.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listSessao = new ListSessaoService();
    let sessoes = await listSessao.execute()

    return response.json(sessoes)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showSessao = new ShowSessaoService();
    let sessao = await showSessao.execute({ id })

    return response.json(sessao)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params

    let { nome, qtdeMembros} = request.body
    let updateService = new UpdateSessaoService();
    let sessao = await updateService.execute({
      id, 
      nome, 
      qtdeMembros
    })

    return response.json(sessao)
  }
}