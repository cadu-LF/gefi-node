import { Request, Response } from "express";
import CreateResponsavelService from "../Services/CreateResponsavelService";
import DeleteResponsavelService from "../Services/DeleteResponsavelService";
import ListResponsavelService from "../Services/ListResponsavelService";
import ShowResponsavelService from "../Services/ShowResponsavelService";
import UpdateResponsavelService from "../Services/UpdateResponsavelService";

export default class ResponsavelController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {cpf, nome, idade, sexo, email, voluntario} = request.body
    let createResponsavel = new CreateResponsavelService()
    let newResponsavel = await createResponsavel.execute({
      cpf,
      nome,
      idade,
      sexo,
      email,
      voluntario
    })

    return response.json(newResponsavel);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let responsavelDelete = new DeleteResponsavelService();
    await responsavelDelete.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let responsavelList = new ListResponsavelService();
    let responsaveis = await responsavelList.execute()

    return response.json(responsaveis)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showResponsavel = new ShowResponsavelService();
    let responsavelResponse = await showResponsavel.execute({ id })

    return response.json(responsavelResponse)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let { cpf, nome, idade, sexo, email, voluntario } = request.body;
    let updateService = new UpdateResponsavelService();
    let responsavel = await updateService.execute({id, cpf, nome, idade, sexo, email, voluntario})

    return response.json(responsavel)
  }
}