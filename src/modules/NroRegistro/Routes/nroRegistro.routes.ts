import { Router } from 'express'

import NroRegistroController from '../Controllers/NroRegistroController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let nroRegistroRouter = Router()
let nroRegistroController = new NroRegistroController()

nroRegistroRouter.get('/', isAuthenticated, nroRegistroController.index) 

nroRegistroRouter.get('/:nroRegistro', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    nroRegistro: Joi.number().required()
  }
}),
nroRegistroController.show)

nroRegistroRouter.post('/', isAuthenticated, 
celebrate({
  [Segments.BODY]: {
    nroRegistro: Joi.number().required(),
    dataVencimento: Joi.date().required(),
  }
}),
nroRegistroController.create)

nroRegistroRouter.delete('/:nroRegistro', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    nroRegistro: Joi.number().required(),
  }
}),
nroRegistroController.delete)

nroRegistroRouter.put('/:nroRegistro', isAuthenticated, 
celebrate({
  [Segments.PARAMS]: {
    nroRegistro: Joi.number().required(),
  },
  [Segments.BODY]: {
    nroRegistro: Joi.number().required(),
    dataVencimento: Joi.date().required(),
  }
}),
nroRegistroController.update)

export default nroRegistroRouter;