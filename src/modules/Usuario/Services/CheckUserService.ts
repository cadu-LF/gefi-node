import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UsuarioRepository from "../typeorm/Repositories/UsuarioRepository";

interface ILogin {
  email: string;
  password: string;
}

export default class CheckUserService {
  public async execute( {email, password}:ILogin): Promise<String> {
    let userRepository = getCustomRepository(UsuarioRepository);

    let user = await userRepository.findByEmail(email);
    
    if (user) {
      const validPassword = await compare(password, user.password);
      
      if (validPassword) {
        return 'OK';
      }
      else {
        return 'Combinação de usuário e senha inválida';
      }
    }
    else {
      return 'Combinação de usuário e senha inválida';
    }
  }
}