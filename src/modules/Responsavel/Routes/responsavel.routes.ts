import { Router } from 'express'

import ResponsavelController from '../Controllers/ResponsavelController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let responsavelRouter = Router()
let responsavelController = new ResponsavelController()

responsavelRouter.get('/', isAuthenticated, responsavelController.index) 

responsavelRouter.get('/:id', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
responsavelController.show)

responsavelRouter.post('/', isAuthenticated, 
celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    nome: Joi.string().required(),
    idade: Joi.date().required(), 
    sexo: Joi.string().required(),
    email: Joi.string().required(), 
    voluntario: Joi.boolean().required()
  }
}),
responsavelController.create)

responsavelRouter.delete('/:id', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
responsavelController.delete)

responsavelRouter.put('/:id', isAuthenticated, 
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
    voluntario: Joi.boolean().required()
  }
}),
responsavelController.update)

export default responsavelRouter;