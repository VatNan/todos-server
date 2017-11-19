const todoDef = require('./todoDef')

const query = `
  type Query {
    todos: [Todo]!
  }
`
const input = `
  input TodoInput {
    text: String!
    isComplete: Boolean = false
  }
`
const mutation = `
  type Mutation {
    addTodo (todo: TodoInput): Todo
    toggleTodo (todoId: String): Todo
    deleteTodo (todoId: String): Todo
  }
`
const typeDefs = [
  query,
  input,
  mutation,
  todoDef
]

module.exports = typeDefs
