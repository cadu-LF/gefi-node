// importa Router de express
import {Router} from 'express'

import userRouter from '../../../modules/Usuario/Routes/usuario.routes'
import sessionUserRouter from '../../../modules/Usuario/Routes/session.routes'
import enderecoRouter from '../../../modules/Endereco/Routes/endereco.routes'
import sessaoRouter from '../../../modules/Sessoes/Routes/sessao.routes'
import responsavelRouter from '../../../modules/Responsavel/Routes/responsavel.routes'
import produtoRouter from '../../../modules/Produto/Routes/produto.routes'
import pessoaRouter from '../../../modules/Pessoas/Routes/pessoa.routes'
import membroRouter from '../../../modules/Membro/Routes/membro.routes'

// criar um objeto da classe Router
let routes = Router();

routes.use('/users', userRouter);
routes.use('/session', sessionUserRouter);
routes.use('/endereco', enderecoRouter);
routes.use('/sessao', sessaoRouter);
routes.use('/responsavel', responsavelRouter);
routes.use('/pessoa', pessoaRouter);
routes.use('/produto', produtoRouter);
routes.use('/membro', membroRouter);
routes.get('/', (request, response) => {
  
  return(response.json({
    mensagem: "Servidor funcionando"
  }))
})

export default routes