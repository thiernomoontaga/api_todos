import {createTodo,findTodo,removeTodo, UpdateTodo} from '../functions/todo_storage.js'
import {json} from 'stream/consumers'

export async function index(){
  const todos = await findTodo()
  return todos
}

export async function create(req,res){
  const body = await json(req)
  const title = body.title
  const completed = body.completed
  const todo = await createTodo(title,completed)
  return todo
}

export async function remove(req,res,url){
  const id = parseInt(url.searchParams.get('id'),10)
  await removeTodo(id)
}

export async function update(req,res,url){
  const id = parseInt(url.searchParams.get('id'),10)
  return UpdateTodo(id,json(req))
}

