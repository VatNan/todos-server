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
  }
}

module.exports = resolvers
