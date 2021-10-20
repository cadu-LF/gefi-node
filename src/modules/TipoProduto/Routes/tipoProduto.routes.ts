import { Router } from 'express'

import TipoProdutoController from '../Controllers/TipoProdutoController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let tipoProdutoRouter = Router()
let tipoProdutoController = new TipoProdutoController()

tipoProdutoRouter.get('/', tipoProdutoController.index) 

tipoProdutoRouter.get('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
}),
tipoProdutoController.show)

tipoProdutoRouter.post('/', isAuthenticated,
celebrate({
  [Segments.BODY]: {
    descricao: Joi.string().required()
  }
}),
tipoProdutoController.create)

tipoProdutoRouter.delete('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}),
tipoProdutoController.delete)

tipoProdutoRouter.put('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    descricao: Joi.string().required()
  }
}),
tipoProdutoController.update)

export default tipoProdutoRouter