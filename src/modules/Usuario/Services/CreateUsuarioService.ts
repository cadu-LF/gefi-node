import { getCustomRepository } from "typeorm";
import AppErrors from "../../../shared/errors/AppErrors";
import Usuario from "../typeorm/Entities/Usuario";
import UsuarioRepository from "../typeorm/Repositories/UsuarioRepository";
import {hash} from 'bcryptjs'

interface IRequest {
  name: string,
  email: string,
  password: string,
}

export default class CreateUserService {

  public async execute({name, email, password}: IRequest): Promise<Usuario> {

    let userReposiory = getCustomRepository(UsuarioRepository);

    let emailExist = await userReposiory.findByEmail(email)

    if(emailExist){
      throw new AppErrors('Já temos usuário com esse email');
    } 

    let hashedPassword = await hash(password, 8);

    let newUser = userReposiory.create({
      name, 
      email,
      password: hashedPassword
    })

    console.log(newUser); // preciso de descobrir pq o id não é autoincrementado
    await userReposiory.save(newUser);

    return newUser;
  }
}