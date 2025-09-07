import { readFile, writeFile } from 'node:fs/promises'
import {NotfoundError} from './errors.js';

const path = 'storage/todo.json'
/**
 * @typedef {object} Todo
 * @param {number} id
 * @param {string} title
 * @param {boolean} completed
 */

/**
 * 
 * @returns {Promise<Todo[]>}
 */
export async function findTodo() {
  const data = await readFile(path,'utf-8')
  return [JSON.parse(data)]
}

/**
 * 
 * @param {string} title 
 * @param {boolean} completed 
 * @returns {Promise<Todo>}
 */

export async function createTodo(title , completed = false){
  const id = Date.now()
  const todo = {title,completed,id}
  const todos = [todo, ...await findTodo()]
  await writeFile(path,JSON.stringify(todos))
  return todo
}

/**
 * 
 * @param {number} id
 * @returns {Promise}
 */

export async function removeTodo(id){
  const todos = await findTodo()
  const todo = todos.findIndex(todo=>todo.id === id)
  if(todo === -1){
    throw new NotfoundError()
  }
  await  writeFile(path,JSON.stringify(todos.filter(todo=>todo.id !== id)))
}

/**
 * 
 * @param {number} id
 * @param {{title?:string,completed?:boolean}} PartialTodo
 * @returns {Promise<Todo>}
 */

export async function UpdateTodo(id,PartialTodo){
  const todos = await findTodo()
  const todo = todos.find(todo=>todo.id === id)
  if(todo === undefined){
    throw NotfoundError()
  }
  Object.assign(todo,PartialTodo)
  return todo
}



