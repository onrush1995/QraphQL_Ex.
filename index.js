let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Query {
    student(id: ID!): Student,
    students: [Student!]!,
    course(id: ID!): Course,
    courses: [Course!]!,
    grade(id: ID!): Grade,
    grades: [Grade!]!,
  }

  type Course {
        id: ID!,
        name: String,
        description: String
      }
    type Grade {
        id: ID!,
        studentid: ID,
        courseid: ID,
        grade: String
    }

  type Student {
    id: ID!,
    email: String,
    Street: String,
    PostCode: String,
    Country: String,
    firstName: String,
    familyName: String,
    birthday: String,
  }
  `;

  

  let students = [
  {
    id: "011",
    email: "jhon.sina@students.oamk.fi",
    firstName: "Jhon",
    familyName: "Sina",
    Street: "Kotkantie 1",
    PostCode: "90250",
    Country: "Finland",
    birthday: "10-12-1997",
  },
  {
    id: "022",
    email: "Fore.Ian@students.oamk.fi",
    firstName: "Fore",
    familyName: "Ian",
    Street: "Oxford Street 79",
    PostCode: "90118",
    Country: "England",
    birthday: "07-09-1996",
  },
  {
  id: "033",
  email: "Barbara.Okely@students.oamk.fi",
  firstName: "Barbara",
  familyName: "Okely",
  Street: "Washington street 092",
  PostCode: "30701",
  Country: "USA",
  birthday: "01-03-1995",
},
{
  id: "044",
  email: "Scott.Peak@students.oamk.fi",
  firstName: "Scott",
  familyName: "Peak",
  Street: "Kajaaninte 34",
  PostCode: "90130",
  Country: "Finland",
  birthday: "06-07-1994",
},

];



let courses = [
    {
        id: 01,
        name: "ICT",
        description: "Basics Of Information Of Technology"
    },
    {
        id: 02,
        name: "Android Development",
        description: "Basics Of Android Development"
    },
    {
        id: 03,
        name: "Java",
        description: "Intermidate of Object Orientened Programming"
    }
];


let grades = [
  {
      id: 001,
      studentid: 1,
      courseid: 02,
      grade: "5",
  },
  {
      id: 002,
      studentid: 1,
      courseid: 02,
      grade: "5.5",
  },
  {
      id: 003,
      studentid: 4,
      courseid: 01,
      grade: "3.5",
  }
];



const resolvers = 
{
  Query: 
  {
    student: (parent, args, context, info) => {
      return students.find(i => i.id === +args.id);
    },
    students: (parents, args, context, info) => {
      return students;
    },
    course: (parent, args, context, info) => {
      return courses.find(c => c.id === +args.id)
  },
  courses: (parents, args, context, info) => {
      return courses;
  },

  grade: (parents, args, context, info) => {
    return grades.find(g => g.id === +args.id);

 },
 grades: (parent, args, context, info) => {
    return grades;
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