const inputDef = require('./inputDefs')
const queryDef = require('./queryDef')
const mutationDef = require('./mutationDef')
const todoDef = require('./todoDef')

const typeDefs = [
  queryDef,
  inputDef,
  mutationDef,
  todoDef
]

module.exports = typeDefs
