import { makeExecutableSchema } from "graphql-tools";
//import mocks from './mocks';
import resolvers from "./resolvers";

const typeDefs = `
type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String # we'll use this later
  allBits: [Bit]
  bit(id: ID): Bit
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Bit {
  id: ID
  title: String
  markdown: String
  type: String
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;
