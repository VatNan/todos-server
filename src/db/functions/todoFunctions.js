const { todoModel: Todo } = require('../models')

const getTodos = async () => {
  try {
    const todos = await Todo.find().exec()
    return todos
  } catch (error) {
    throw new Error(error)
  }
}

const addTodo = async todoInput => {
  try {
    const todo = new Todo(todoInput)
    const newTodo = await todo.save()
    return newTodo
  } catch (error) {
    throw new Error(error)
  }
}

const toggleTodo = async todoId => {
  try {
    const todo = await Todo.findById(todoId).exec()
    todo.isComplete = !todo.isComplete
    const result = todo.save()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTodo = async todoId => {
  try {
    const todo = await Todo.findById(todoId).exec()
    const result = await todo.remove()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo
}
