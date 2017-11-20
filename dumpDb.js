const { todoModel: Todo } = require('./src/db')

const dumpDb = async () => {
  try {
    const todoLength = await Todo.count().exec()
    if (todoLength > 0) {
      return
    }
    //TODO
  } catch (error) {
    throw error
  }
}

module.exports = dumpDb
