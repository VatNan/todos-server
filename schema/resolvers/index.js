const todos = [
  {
    id: '0001ee',
    text: 'test naja 01',
    isComplete: false
  },
  {
    id: '0002ee',
    text: 'test naja 02',
    isComplete: false
  }
]
const resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    addTodo: (_, { todo }) => {
      todos.push({ id: Math.random() + '', ...todo })
      return todos[todos.length - 1]
    },
    toggleTodo:(_, { todoId }) => {
      return todos
    },
    deleteTodo: (_, { todoId }) => {
      return todos
    }
  }
}

module.exports = resolvers
