const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo
} = require('../../db')

const resolvers = {
  Query: {
    todos: () => getTodos()
  },
  Mutation: {
    addTodo: (_, { todo }) => addTodo(todo),
    toggleTodo: (_, { todoId }) => toggleTodo(todoId),
    deleteTodo: (_, { todoId }) => deleteTodo(todoId)
  }
}

module.exports = resolvers
