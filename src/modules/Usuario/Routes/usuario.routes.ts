import { Router } from 'express'

import UsuarioController from '../Controllers/UsuarioController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

let userRouter = Router()
let userController = new UsuarioController()

userRouter.get('/',  userController.index) 

userRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}),
userController.create)

export default userRouter