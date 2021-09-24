import { Router } from 'express'

import SessaoController from '../Controllers/SessaoController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let sessaoRouter = Router()
let sessaoController = new SessaoController()

sessaoRouter.get('/',isAuthenticated, sessaoController.index) 

sessaoRouter.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
sessaoController.show)

sessaoRouter.post('/',
celebrate({
  [Segments.BODY]: {
    nome: Joi.string().required(),
    qtdeMembros: Joi.number()
  }
}),
sessaoController.create)

sessaoRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
sessaoController.delete)

sessaoRouter.put('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    nome: Joi.string().required(),
    qtdeMembros: Joi.number()
  }
}),
sessaoController.update)

export default sessaoRouter