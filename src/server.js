import http from 'http'
// import {randomUUID} from 'crypto'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
// import { Database } from './database.js'

// UUID => Unique Universal ID

// - Criar usuarios
// - Listagem de usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
// - Método HTTP
// - URL

// GET, POST PUT, PATCH, DELETE

// GET  => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT  => Atualizar
// PATCH=> ATUALIZAR INFORMAÇÕE ESPECIFICAR DE UM RECURSO NO BACK END
// DELETE

// GET
// POST

// Stateful - stateless

//const database = new Database // AGORA FOI PARA O ROUTES.JS

// Query Parameters: URL sTATEFUL => fILTROS, PAGINACAÇÃO, NÃO -OBRIGATORIOS
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    // return route.method === method && route.path === url
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    //console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups

    //req.params = { ...routeParams.groups }
    
    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  /*if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
    //.setHeader('Content-type', 'application/json')
  }

  if (method === 'POST' && url === '/users'){
    const { name, email } = req.body
    
    const user = {
      id: 1,
      name,
      email,
    }

    database.insert('users',user)

    return res.writeHead(201).end()
   //return res.end('Criação de usuário')
  }*/

  return res.writeHead(404).end()
  //return res.end('Hello World')
})

server.listen(3333)