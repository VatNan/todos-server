const express = require('express')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlConnect } = require('apollo-server-express')
const mongoose = require('mongoose')
const { typeDefs, resolvers } = require('./src/schema')
const dumpDb = require('./dumpDb')

const PORT = 3000
const MONGO_URL = 'mongodb://localhost/testTodo'
const app = express()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
// config mongoose
mongoose.connect(MONGO_URL, { useMongoClient: true }, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!')
    throw error
  }
  dumpDb()
})
mongoose.Promise = global.Promise
// config graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlConnect({ endpointURL: '/graphql' }))
app.listen(PORT)
