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
      type: tokenId,
      description: 'Token',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => token.find(hospitallocation => tokenId.id === args.id)
    },
    hospital: {
      type: new GraphQLList(HospitalId),
      description: 'Hospital List',
      resolve: () => hospital
    },
    token: {
      type: new GraphQLList(tokenId),
      description: 'Token List',
      resolve: () => authors
    },
    patient: {
      type: Patients,
      description: 'Patient List',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => patient.find(patientId => tokenId === args.id)
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addPatient: {
      type: patientId,
      description: 'Add a patient',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const patient = { id: tokenId + 1, name: args.name, patientId: args.authorId }
        patient.push(patient)
        return patient
      }
    },
    addHospital: {
      type: hospitalId,
      description: 'Add a Hospital',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const hospital = { id: hospital.distance + 1, name: args.name }
        hospital.push(hospital)
        return hospital
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
