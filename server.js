import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import schema from "./data/schema";
import cors from "cors";
import jwt from "express-jwt";

const GRAPHQL_PORT = 8000;

const graphQLServer = express();

var whitelist = ["http://localhost:61187"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: false
};
graphQLServer.use(cors(corsOptions));

const jwtCheck = jwt({
  credentialsRequired: false,
  secret: process.env.JWT_SECRET
}); // change out your secret for each environment

graphQLServer.use(
  "/graphql",
  jwtCheck,
  bodyParser.json(),
  graphqlExpress(req => ({ context: req.user, schema: schema }))
);
//graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

graphQLServer.listen(GRAPHQL_PORT);
/*graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);*/
