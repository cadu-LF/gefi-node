import { Request, Response } from "express";
import CreateNroRegistroService from "../Services/CreateNroRegistroService";
import DeleteNroRegistroService from "../Services/DeleteNroRegistroService";
import ListNroRegistroService from "../Services/ListNroRegistroService";
import ShowNroRegistroService from "../Services/ShowNroRegistroService";
import UpdateNroRegistroService from "../Services/UpdateNroRegistroService";

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {

    let {nroRegistro, dataVencimento} = request.body
    let createProduct = new CreateNroRegistroService()
    let newProduct = await createProduct.execute({
      nroRegistro,
      dataVencimento
    })

    return response.json(newProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let { nroRegistro } = request.params;
    let nroRegistroDelete = new DeleteNroRegistroService();
    await nroRegistroDelete.execute({ nroRegistro })

    return response.json([])
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let nroRegistroList = new ListNroRegistroService();
    let nroRegistro = await nroRegistroList.execute()

    return response.json(nroRegistro)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { nroRegistro } = request.params
    let showNroRegistro = new ShowNroRegistroService();
    let nroRegistroResponse = await showNroRegistro.execute({ nroRegistro })

    return response.json(nroRegistroResponse)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { nroRegistro, dataVencimento } = request.body
    let updateService = new UpdateNroRegistroService();
    let product = await updateService.execute({nroRegistro, dataVencimento})

    return response.json(product)
  }
}