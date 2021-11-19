import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import routes from './routes/routes'
import '../typeorm'
import {errors} from 'celebrate'
import AppErrors from '../errors/AppErrors'


let servidor = express();

servidor.use(express.json())

servidor.use(routes)
servidor.use(errors())
servidor.use(
  (error:Error, request:Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErrors) { // vamos tratar o erro
      return response.status(error.statusCode).json({
        status: 'erro',
        message: error.message
      })
    }

    console.log(error)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)
servidor.listen(3333, () => {
  console.log("Server online")
})