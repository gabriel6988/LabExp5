const User = require('./models/User');
const Post = require('./models/Post');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    age: Int
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }
`;

const resolvers = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
    posts: () => Post.find(),
    post: (_, { id }) => Post.findById(id),
  },
  User: {
    posts: (parent) => Post.find({ authorId: parent.id }),
  },
  Post: {
    author: (parent) => User.findById(parent.authorId),
  },
};

module.exports = { typeDefs, resolvers };