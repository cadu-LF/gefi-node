import { getCustomRepository } from "typeorm";
import Usuario from "../typeorm/Entities/Usuario";
import UsuarioRepository from "../typeorm/Repositories/UsuarioRepository";

export default class ListUsuarioService {
  
  public async execute(): Promise<Usuario[]> {

    let userRepository = getCustomRepository(UsuarioRepository)
    let users = await userRepository.find()
    return users
  }
}