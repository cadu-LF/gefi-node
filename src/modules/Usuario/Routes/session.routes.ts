import { Router } from 'express'

import SessaoController from '../Controllers/SessaoController'
import {celebrate, Joi, Segments} from 'celebrate'

let sessionUserRouter = Router()
let sessionUserController = new SessaoController()

sessionUserRouter.post('/',
celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}),
sessionUserController.create)

export default sessionUserRouter