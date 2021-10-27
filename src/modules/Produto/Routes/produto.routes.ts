import { Router } from 'express'

import ProdutoController from '../Controllers/ProdutoController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let produtoRouter = Router()
let produtoController = new ProdutoController()

produtoRouter.get('/', isAuthenticated, produtoController.index) 

produtoRouter.get('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    codProduto: Joi.number().required()
  }
}),
produtoController.show)

produtoRouter.post('/', isAuthenticated,
celebrate({
  [Segments.BODY]: {
    codProduto: Joi.number().required(),
    categoria: Joi.string().required(),
    descProduto: Joi.string().required(),
    valorProduto: Joi.number().required(),
    tipoProduto: Joi.object().required(),
  }
}),
produtoController.create)

produtoRouter.delete('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    codProduto: Joi.number().required(),
  }
}),
produtoController.delete)

produtoRouter.put('/:id', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    codProduto: Joi.number().required(),
  },
  [Segments.BODY]: {
    codProduto: Joi.number().required(),
    categoria: Joi.string().required(),
    descProduto: Joi.string().required(),
    valorProduto: Joi.number().required(),
    tipoProduto: Joi.object().required(),
  }
}),
produtoController.update)

export default produtoRouter