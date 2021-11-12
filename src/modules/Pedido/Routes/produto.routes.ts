import { Router } from 'express';

import PedidoController from '../Controllers/PedidoController';
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';

let pedidoRouter = Router();
let pedidoController = new PedidoController();

pedidoRouter.get('/', isAuthenticated, pedidoController.index);

pedidoRouter.get('/:idPedido', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    idPedido: Joi.number().required()
  }
}),
pedidoController.show);

pedidoRouter.post('/', isAuthenticated,
celebrate({
  [Segments.BODY]: {
    sitaucao: Joi.string().required(),
    observacao: Joi.string().required(),
    produtos: Joi.array().required(),
    membro: Joi.object().required(),
  }
}),
pedidoController.create);

pedidoRouter.delete('/:idPedido', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    idPedido: Joi.number().required(),
  }
}),
pedidoController.delete);

pedidoRouter.put('/:idPedido', isAuthenticated,
celebrate({
  [Segments.PARAMS]: {
    idPedido: Joi.number().required(),
  },
  [Segments.BODY]: {
    situacao: Joi.number().required(),
    observacao: Joi.string().required(),
    produtos: Joi.array().required(),
    membro: Joi.object().required(),
  }
}),
pedidoController.update);

export default pedidoRouter;