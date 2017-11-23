const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlConnect } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./src/schema')
const dumpDB = require('./dumpDB')
const { MONGO_URL } = require('./config/dbConfig')
const { SERVER_PORT } = require('./config/serverConfig')

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
  dumpDB()
})
mongoose.Promise = global.Promise
// config graphql
app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlConnect({ endpointURL: '/graphql' }))
app.listen(SERVER_PORT)
