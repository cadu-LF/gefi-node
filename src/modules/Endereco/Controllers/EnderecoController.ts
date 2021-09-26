import { Request, Response } from "express";

import CreateEnderecoService from '../Services/CreateEnderecoService'
import DeleteEnderecoService from '../Services/DeleteEnderecoService'
import ListEnderecoService from '../Services/ListEnderecoService'
import ShowEnderecoService from '../Services/ShowEnderecoService'
import UpdateEnderecoService from '../Services/UpdateEnderecoService'

export default class EnderecoController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {numero, rua, bairro, complemento} = request.body
    let createEndereco = new CreateEnderecoService()
    let newEndereco = await createEndereco.execute({
      numero, 
      rua, 
      bairro,
      complemento
    })

    return response.json(newEndereco);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let deleteEndereco = new DeleteEnderecoService();
    await deleteEndereco.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listEndereco = new ListEnderecoService();
    let enderecos = await listEndereco.execute()

    return response.json(enderecos)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showEndereco = new ShowEnderecoService();
    let endereco = await showEndereco.execute({ id })

    return response.json(endereco)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params

    let { numero, rua, bairro, complemento } = request.body
    let updateService = new UpdateEnderecoService();
    let endereco = await updateService.execute({id, numero, rua, bairro, complemento})

    return response.json(endereco)
  }
}