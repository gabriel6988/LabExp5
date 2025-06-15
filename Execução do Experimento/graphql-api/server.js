const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/api_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});

(async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server));
  app.listen(4000, () => {
    console.log('GraphQL API running on http://localhost:4000/graphql');
  });
})();