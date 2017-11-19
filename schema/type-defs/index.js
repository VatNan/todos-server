const Todo = require('./todoDef')

const rootQuery = `
  type Query {
    todos: [Todo]!
  }
`

const typeDefs = [
  rootQuery,
  Todo
]

module.exports = typeDefs
