import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  scalar Timestamp

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Feed {
    id: Int!
    tableId: Int!
    type: String!
    fellowship: String
    name: String!
    description: String!
    image_url: String
    created_ts: Timestamp!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    foundersFeed(limit: Int!, offset: Int!): [Feed!]!
    angelsFeed(limit: Int!, offset: Int!): [Feed!]!
    writersFeed(limit: Int!, offset: Int!): [Feed!]!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
