import { Request, Response } from "express";
import CreateEnderecoService from "../Services/CreateEnderecoService";
import DeleteEnderecoService from "../Services/DeleteEnderecoService";
import ListEnderecoService from "../Services/ListEnderecoService";
import ShowEnderecoService from "../Services/ShowEnderecoService";
import UpdateEnderecoService from "../Services/UpdateEnderecoService";

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {numero, rua, bairro, complemento} = request.body
    let createProduct = new CreateEnderecoService()
    let newProduct = await createProduct.execute({
      numero, 
      rua, 
      bairro,
      complemento
    })

    return response.json(newProduct);
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
    let product = await updateService.execute({id, numero, rua, bairro, complemento})

    return response.json(product)
  }
}