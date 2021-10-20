import { Request, Response } from "express";

import CreatePessoaService from '../Services/CreatePessoaService'
import DeletePessoaService from '../Services/DeletePessoaService'
import ListPessoaService from '../Services/ListPessoaService'
import ShowPessoaService from '../Services/ShowPessoaService'
import UpdatePessoaService from '../Services/UpdatePessoaService'

export default class PessoaController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {cpf, nome, idade, sexo, email} = request.body
    let createPessoa = new CreatePessoaService()
    let newPessoa = await createPessoa.execute({
      cpf, 
      nome, 
      idade,
      sexo,
      email
    })

    return response.json(newPessoa);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { id } = request.params;
    let deletePessoa = new DeletePessoaService();
    await deletePessoa.execute({ id })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let listPessoa = new ListPessoaService();
    let pessoas = await listPessoa.execute()

    return response.json(pessoas)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { id } = request.params
    let showPessoa = new ShowPessoaService();
    let pessoa = await showPessoa.execute({ id })

    return response.json(pessoa)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { id } = request.params

    let { cpf, nome, idade, sexo, email } = request.body
    let updateService = new UpdatePessoaService();
    let endereco = await updateService.execute({id, cpf, nome, idade, sexo, email})

    return response.json(endereco)
  }
}