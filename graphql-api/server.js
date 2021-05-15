const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const hospitals = [
	{ id: 1, name: 'Springfield Hospital' },
	{ id: 2, name: 'Brampton Civic' },
	{ id: 3, name: 'Quahog Hospital' }
]

const patient = [
	{ id: 1, name: 'John Doe', patientId: 1 },
	{ id: 2, name: 'John Doe', patientId: 1 },
	{ id: 3, name: 'John Doe', patientId: 1 },
	{ id: 4, name: 'John Doe', patientId: 2 },
	{ id: 5, name: 'John Doe', patientId: 2 },
	{ id: 6, name: 'John Doe', patientId: 2 },
	{ id: 7, name: 'John Doe', patientId: 3 },
	{ id: 8, name: 'John Doe', patientId: 3 }
]

const token = [
  { id: 1, name: '13048109348', tokenId: 1 },
  { id: 2, name: '13048109348', tokenId: 1 },
  { id: 3, name: '13048109348', tokenId: 1 },
  { id: 4, name: '13048109348', tokenId: 2 },
  { id: 5, name: '13048109348', tokenId: 2 },
  { id: 6, name: '13048109348', tokenId: 2 },
  { id: 7, name: '13048109348', tokenId: 3 },
  { id: 8, name: '13048109348', tokenId: 3 },
  { id: 9, name: '13048109348', tokenId: 3 },
]

const swiftmedId = new GraphQLObjectType({
  name: 'SwiftMed ID',
  description: 'Personalized token for data transportation',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    patientId: { type: GraphQLNonNull(GraphQLInt) },
    patient: {
      type: token,
      resolve: (token) => {
        return patient.find(patient => tokenId === patient.tokenId)
      }
    }
  })
})

const hospitaldistance = new GraphQLObjectType({
  name: 'Hospital Distance',
  description: 'Distance and Location endpoint for different hostpitals',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    hospital: { type: GraphQLNonNull(GraphQLInt) },
    hospitaldistance: {
      type: token,
      resolve: (token) => {
        return hospital.find(patient => tokenId === hospital.swiftmedId)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    swiftmedId: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a patient',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.listen(5000, () => console.log('Server Running!!'))