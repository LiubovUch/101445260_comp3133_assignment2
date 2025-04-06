require('dotenv').config();


console.log('Current Directory:', process.cwd());
console.log('MONGO_URI:', process.env.MONGO_URI || ' Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? ' Present' : ' Missing');

const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`🚫 ERROR: Environment variable "${key}" is not defined.`);
    process.exit(1);
  }
});


const mongoose = require('mongoose');

const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
};

mongoose.connect(process.env.MONGO_URI, mongoOptions)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB Connection Failed:', err.message);
    console.log('Please verify your MONGO_URI in the .env file');
    process.exit(1);
  });


const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    jwtSecret: process.env.JWT_SECRET,
  }),
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  },
  introspection: true, 
  playground: true,    
});


(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`MongoDB: ${process.env.MONGO_URI ? 'Available' : 'Unavailable'}`);
    console.log(` JWT_SECRET: ${process.env.JWT_SECRET ? 'Available' : 'Unavailable'}`);
  });
})();
