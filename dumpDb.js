const { todoModel: Todo } = require('./src/db')
const { IS_DUMP_DB } = require('./config/dbConfig')

const dumpDb = async () => {
  try {
    const todoLength = await Todo.count().exec()
    if (todoLength > 0 || !IS_DUMP_DB) {
      return
    }
    // TODO: when want to use dump data
  } catch (error) {
    throw error
  }
}

module.exports = dumpDb
