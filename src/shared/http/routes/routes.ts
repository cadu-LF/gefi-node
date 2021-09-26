// importa Router de express
import {Router} from 'express'

import userRouter from '../../../modules/Usuario/Routes/usuario.routes'
import sessionUserRouter from '../../../modules/Usuario/Routes/session.routes'
import enderecoRouter from '../../../modules/Endereco/Routes/endereco.routes'
import sessaoRouter from '../../../modules/Sessoes/Routes/sessao.routes'
import nroRegistroRouter from '../../../modules/NroRegistro/Routes/nroRegistro.routes'
import produtoRouter from '../../../modules/Produto/Routes/produto.routes'

// criar um objeto da classe Router
let routes = Router()

routes.use('/users', userRouter)
routes.use('/session', sessionUserRouter)
routes.use('/endereco', enderecoRouter)
routes.use('/sessao', sessaoRouter)
routes.use('/numero-registro', nroRegistroRouter)
routes.use('/produto', produtoRouter)
routes.get('/', (request, response) => {
  
  return(response.json({
    mensagem: "Servidor funcionando"
  }))
})

export default routes