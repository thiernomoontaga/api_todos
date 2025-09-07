import { createServer } from 'node:http'
import {index,create,remove} from './api/todos.js'
import { NotfoundError } from './functions/errors.js'

createServer(async(req,res)=>{
  try{
      res.setHeader('content-Type' , 'application/json')
      const url = new URL(req.url ,`http://${req.headers.host}`)
      const endpoint = `${req.method}:${url.pathname}`
      console.log(`${url.pathname}`)
      let resultats
      console.log(endpoint)

      switch (endpoint) {
        case 'GET:/todos':
          resultats = await index()
          break;
        case 'POST:/todos':
          resultats = await create(req,res)
          break;
        case 'DELETE:/todos':
          resultats = await remove(req,res,url)
          break;
        default:
          res.writeHead(404)
          break;
      }
      if(resultats){
        res.write(JSON.stringify(resultats))
      }
  }catch(e){
    if(e instanceof NotfoundError){
      res.writeHead(404)
    }
    else {
      throw e
    }
  }
  res.end()
}).listen('3001') 

