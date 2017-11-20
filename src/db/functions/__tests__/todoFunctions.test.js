const mockingoose = require('mockingoose').default
const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo
} = require('../todoFunctions')
const { todoModel: Todo } = require('../../models')

describe('Function: todoFunctions', () => {
  beforeEach(() => {
    mockingoose.Todo.reset()   
  })

  test('getTodos must return todo list', async () => {
    const mockTodos = [{
      text: 'eat salad',
      isComplete: true
    }, {
      text: 'eat food',
      isComplete: false
    }]
    mockingoose.Todo.toReturn(mockTodos, 'find')
    const todos = await getTodos()
    expect(todos).toHaveLength(2)
  })

  test('addTodo must return todo is add', async () => {
    const mockTodo = {
      text: 'eat hotdog',
      isComplete: true
    }
    mockingoose.Todo.toReturn(mockTodo, 'save')
    const todo = await addTodo(mockTodo)
    expect(todo._id).toBeDefined()
    expect(todo.text).toBe(mockTodo.text)
    expect(todo.isComplete).toBe(mockTodo.isComplete)
  })

  test('toggleTodo must return todo is toggle status', async () => {
    const mockOldTodo = {
      _id: '507f191e810c19729de860ea',
      text: 'eat noodle',
      isComplete: false
    }
    const mockTodoAfterSave = { ...mockOldTodo, isComplete: true }
    mockingoose.Todo.toReturn(mockOldTodo, 'findOne')
    mockingoose.Todo.toReturn(mockTodoAfterSave, 'save')
    const todo = await toggleTodo(mockOldTodo._id)
    expect(mockOldTodo.isComplete).not.toBe(todo.isComplete)
  })

  test('deleteTodo must return todo is delele', async () => {
    const mockTodo = {
      _id: '507f191e810c19729de860ea',
      text: 'eat cake',
      isComplete: false
    }
    mockingoose.Todo.toReturn(mockTodo, 'findOneAndRemove')
    const todo = await deleteTodo(mockTodo._id)
    expect(todo._id).toBeDefined()
    expect(todo.text).toBe(mockTodo.text)
    expect(todo.isComplete).toBe(mockTodo.isComplete)
  })
})
