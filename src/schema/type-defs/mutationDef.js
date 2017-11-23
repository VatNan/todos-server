const mutationDef = `
  type Mutation {
    addTodo (todo: TodoInput!): Todo
    toggleTodo (todoId: String!): Todo
    deleteTodo (todoId: String!): Todo
  }
`

module.exports = mutationDef
