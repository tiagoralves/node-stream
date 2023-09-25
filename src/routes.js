import {randomUUID} from 'crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// Route parameters, request body, query parameters

export const routes = [
{
  method: 'GET',
  path: buildRoutePath('/users'),
  handler: (req, res) => {
    const { search } = req.query
    //console.log(req.query)
    
    //const users = database.select('users')
    const users = database.select('users',search ? {
      name: search,
      email: search
    } : null )

    return res.end(JSON.stringify(users))
  }
},
{
  method: 'POST',
  path: buildRoutePath('/users'),
  handler: (req, res) => {
    const { name, email } = req.body
    
    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users',user)

    return res.writeHead(201).end()
   //return res.end('Criação de usuário')
  }
},
{
  method: 'PUT',
  path: buildRoutePath('/users/:id'),
  handler: (req, res) => {
    const {id} = req.params
    const { name, email } = req.body

    database.update('users', id, {
      name,
      email,
    })

    console.log(req.params)

    return res.writeHead(204).end()
  },
},
{
  method: 'DELETE',
  path: buildRoutePath('/users/:id'),
  handler: (req, res) => {
    const {id} = req.params

    database.delete('users', id)

    console.log(req.params)

    return res.writeHead(204).end()
  },
}

]