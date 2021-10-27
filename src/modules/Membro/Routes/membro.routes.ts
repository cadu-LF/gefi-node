import { Router } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'

import MembroController from '../Controllers/MembroController'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let membroRouter = Router()
let membroController = new MembroController()

membroRouter.get('/', isAuthenticated, membroController.index) 

membroRouter.get('/:id', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
membroController.show)

membroRouter.post('/', isAuthenticated, 
celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    nome: Joi.string().required(),
    idade: Joi.number().required(), 
    sexo: Joi.string().required(),
    email: Joi.string().required, 
    nroRegistro: Joi.number().required(),
    vencimentoRegistro: Joi.date().required(),
    sessao: Joi.object().required(),
    responsavel: Joi.object().required(),
    irmaos: Joi.object()
  }
}),
membroController.create)

membroRouter.delete('/:id', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
membroController.delete)

membroRouter.put('/:id', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    nome: Joi.string().required(),
    idade: Joi.number().required(), 
    sexo: Joi.string().required(),
    email: Joi.string().required, 
    nroRegistro: Joi.number().required(),
    vencimentoRegistro: Joi.date().required(),
    sessao: Joi.object().required(),
    responsavel: Joi.object().required(),
    irmaos: Joi.object()
  }
}),
membroController.update)

export default membroRouter;