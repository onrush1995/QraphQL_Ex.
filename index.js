let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Query {
    Student: Student,
    students: [Student!]!
  }


  type Student {
    id: ID!,
    name: String!,
    email: String!,
    Street: String!,
    PostCode: String!,
    Country: String!,
    firstName: String!,
    familyName: String!,
    birthday: String,
  }
  `;

  let students = [
  {
    id: "1",
    email: "jhon.sina@students.oamk.fi",
    firstName: "Jhon",
    familyName: "Sina",
    Street: "Kotkantie 1",
    PostCode: "90250",
    Country: "Finland",
    birthday: "10-12-1997",
  },
  {
    id: "2",
    email: "Fore.Ian@students.oamk.fi",
    firstName: "Fore",
    familyName: "Ian",
    Street: "Oxford Street 79",
    PostCode: "90118",
    Country: "England",
    birthday: "07-09-1996",
  },
  {
  id: "3",
  email: "Barbara.Okely@students.oamk.fi",
  firstName: "Barbara",
  familyName: "Okely",
  Street: "Washington street 092",
  PostCode: "30701",
  Country: "USA",
  birthday: "01-03-1995",
},
{
  id: "4",
  email: "Scott.Peak@students.oamk.fi",
  firstName: "Scott",
  familyName: "Peak",
  Street: "Kajaaninte 34",
  PostCode: "90130",
  Country: "Finland",
  birthday: "06-07-1994",
},

];

const resolvers = {
  Query: {
    Student: (parent, args, context, info) => {
      return students[0];
    },
    students: (parents, args, context, info) => {
      return students;
    }
  }
};



const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});



server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});