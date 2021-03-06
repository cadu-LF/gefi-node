import { Request, Response } from "express";
import SessaoUsuarioService from "../Services/SessaoUsuarioService";

export default class SessaoUsuarioController {

  public async create(request: Request, response: Response): Promise<Response> {

    let {email, password} = request.body

    let createSession = new SessaoUsuarioService()
    let user = await createSession.execute({
      email,
      password
    })

    return response.json(user);
  }
}