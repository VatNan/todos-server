const { getTodos, addTodo, toggleTodo, deleteTodo } = require('./functions')
const { todoModel } = require('./models')

module.exports = {
  // functions
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  // models
  todoModel
}
