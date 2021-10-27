import { Request, Response } from "express";
import CreateMembroService from "../Services/CreateMembroService";
import DeleteMembroService from "../Services/DeleteMembroService";
import ListMembroService from "../Services/ListMembroService";
import ShowMembroService from "../Services/ShowMembroService";
import UpdateMembroService from "../Services/UpdateMembroService";

export default class MembroController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {
      cpf,
      nome,
      idade,
      sexo,
      email,
      nroRegistro,
      vencimentoRegistro,
      sessao,
      responsavel,
      irmaos
    } = request.body
    let createMembro = new CreateMembroService()
    let newMembro = await createMembro.execute({
      cpf,
      nome,
      idade,
      sexo,
      email,
      nroRegistro,
      vencimentoRegistro,
      sessao,
      responsavel,
      irmaos
    })

    return response.json(newMembro);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let membroDelete = new DeleteMembroService();
    await membroDelete.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let membrolList = new ListMembroService();
    let membros = await membrolList.execute()

    return response.json(membros)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showMembro = new ShowMembroService();
    let membroResponse = await showMembro.execute({ id })

    return response.json(membroResponse)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let { 
      cpf,
      nome,
      idade,
      sexo,
      email,
      nroRegistro,
      vencimentoRegistro,
      sessao,
      responsavel,
      irmaos } = request.body;
    let updateService = new UpdateMembroService();
    let membro = await updateService.execute({
      id,
      cpf,
      nome,
      idade,
      sexo,
      email,
      nroRegistro,
      vencimentoRegistro,
      sessao,
      responsavel,
      irmaos})

    return response.json(membro)
  }
}