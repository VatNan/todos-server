const express = require('express')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlConnect  } = require('apollo-server-express')

const PORT = 3000
// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
]
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
]
const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`

const RootQuery = `
  type RootQuery {
    post(id: Int!): Post
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`
const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => authors.find(author => author.id === id),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = posts.find(post => post.id === postId);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => posts.filter(post => post.authorId === author.id),
  },
  Post: {
    author: (post) => authors.find(author => post.authorId === author.id),
  }
}
const app = express()
const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers
})
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlConnect({ endpointURL: '/graphql' }))
app.listen(PORT)