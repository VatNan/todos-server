const express = require('express')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlConnect  } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./src/schema')

const PORT = 3000
const app = express()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlConnect({ endpointURL: '/graphql' }))
app.listen(PORT)
