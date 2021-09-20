// importar a dependência do Express
import express, { NextFunction, Request, Response } from 'express'
// importa dependência do Express para erro
import 'express-async-errors'
import routes from './routes/routes'
//importar e executa conexão com o BD
import '../typeorm'
// vamos usar a dependencia celebrate 
import {errors} from 'celebrate'
// utilizar a classe AppError
import AppErrors from '../errors/AppErrors'


// cria um server express
let servidor = express();

//servidor suporta convertar dados para JSON
servidor.use(express.json())

// associa a rota ao servidor
servidor.use(routes)

// servidor vai tratar erros do celebrate
servidor.use(errors())

servidor.use(
  (error:Error, request:Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErrors) { // vamos tratar o erro
      return response.status(error.statusCode).json({
        status: 'erro',
        message: error.message
      })
    }

    // erro não é tratado por nós
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)
// sobe o servidor que fica escutando as requisições
servidor.listen(3333, () => {
  console.log("Server online")
})