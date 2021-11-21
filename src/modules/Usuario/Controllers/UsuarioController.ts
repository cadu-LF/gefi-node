import { Request, Response } from "express";
import CheckUserService from "../Services/CheckUserService";
import CreateUsuarioService from "../Services/CreateUsuarioService";
import ListUsuarioService from "../Services/ListUsuarioService";

export default class UsuarioController {

  public async create(request: Request, response: Response): Promise<Response> {

    let {name, email, password} = request.body;
    let createUser = new CreateUsuarioService();
    let newUser = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(newUser);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    
    let listUser = new ListUsuarioService();
    let users = await listUser.execute();

    return response.json(users);
  }

  public async checkUser (request: Request, response: Response): Promise<Response>{
    let {email, password} = request.body;
    let checkUserService = new CheckUserService();

    let resposta = await checkUserService.execute({email, password});
    
    return response.json(resposta);
}
}