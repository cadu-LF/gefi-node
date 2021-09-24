// importa Router de express
import {Router} from 'express'
import userRouter from '../../../modules/Usuario/Routes/usuario.routes'
import sessionUserRouter from '../../../modules/Usuario/Routes/session.routes'
import enderecoRouter from '../../../modules/Endereco/Routes/endereco.routes'
import sessaoRouter from '../../../modules/Sessoes/Routes/endereco.routes'

// criar um objeto da classe Router
let routes = Router()

routes.use('/users', userRouter)
routes.use('/session', sessionUserRouter)
routes.use('/endereco', enderecoRouter)
routes.use('/sessao', sessaoRouter)
routes.get('/', (request, response) => {
  
  return(response.json({
    nome: "Cadu",
    idade: 19,
    altura: 1.75,
    mensagem: "Deu certo"
  }))
})

export default routes