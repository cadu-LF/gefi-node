import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Usuario from "../typeorm/Entities/Usuario";
import UsuarioRepository from "../typeorm/Repositories/UsuarioRepository";
import {sign} from 'jsonwebtoken'
import authConfig from '../../../config/auth'

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  user: Usuario,
  token: string,
}

class SessaoUsuarioService {
  public async execute({email, password}: IRequest): Promise<IResponse> {
    let userRespository = getCustomRepository(UsuarioRepository)
    
    let user = await userRespository.findByEmail(email)

    if (!user) {
      throw new AppError(`Incorrect email/password combination`, 401)
    }
    
    let passwordConfirmed = await compare(password, user.password)
    
    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email/password combination`, 401)
    }

    const sub = '' + user.id;

    let token = sign({}, authConfig.jwt.secret, {
      subject: sub,
      expiresIn: authConfig.jwt.expiresIn
  })

    return {
      user,
      token
    }
  }
}

export default SessaoUsuarioService
