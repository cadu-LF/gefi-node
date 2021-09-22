import { Router } from 'express'

import EnderecoController from '../Controllers/EnderecoController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let enderecoRouter = Router()
let enderecoController = new EnderecoController()

enderecoRouter.get('/',isAuthenticated, enderecoController.index) 

enderecoRouter.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
enderecoController.show)

enderecoRouter.post('/',
celebrate({
  [Segments.BODY]: {
    numero: Joi.number().required(),
    rua: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required()
  }
}),
enderecoController.create)

enderecoRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
enderecoController.delete)

enderecoRouter.put('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    numero: Joi.number().required(),
    rua: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required()
  }
}),
enderecoController.update)

export default enderecoRouter