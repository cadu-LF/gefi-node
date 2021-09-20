import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import AppError from "../errors/AppErrors"
import authConfig from "../../config/auth"

export default function isAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
  ): void {

    //obter a autorização que está dentro do header da request
    let authHeaders = request.headers.authorization

    if (!authHeaders) {
      throw new AppError(`JWT Token is missing`)
    }

    // nome da variável com token => Beared
    // Beared vwebewnrbwerb(token)
    // vetor[0] = Beared e vetor[1] = token
    // token terá 'vwebewnrbwerb'
    let [, token] = authHeaders.split(' ')

    //verifica se o token é valido

    // tratamento de erro
    try { // tenta verificar se o token é valido
      let decodedToken = verify(token, authConfig.jwt.secret)
      return next() //deixa a API ser consumida
    }
    catch { // lança erro se o token não for válido
      throw new AppError(`Invalid JWT token`)
    }
}