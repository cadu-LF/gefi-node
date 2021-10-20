import { Router } from 'express'

import PessoaController from '../Controllers/PessoaController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let pessoaRouter = Router()
let pessoaController = new PessoaController()

pessoaRouter.get('/', pessoaController.index) 

pessoaRouter.get('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
pessoaController.show)

pessoaRouter.post('/', isAuthenticated,
celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    nome: Joi.string().required(),
    idade: Joi.number().required(),
    sexo: Joi.string().required(),
    email: Joi.string().required()
  }
}),
pessoaController.create)

pessoaRouter.delete('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
pessoaController.delete)

pessoaRouter.put('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    nome: Joi.string().required(),
    idade: Joi.number().required(),
    sexo: Joi.string().required(),
    email: Joi.string().required()
  }
}),
pessoaController.update)

export default pessoaRouter