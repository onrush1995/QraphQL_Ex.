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
    gradesByStudent(studentid: ID!): [Grade!]!,
    gradesByCourse(courseid: ID!): [Grade!]!
   
  }



  type Course {
        id: ID!,
        name: String,
        description: String,
        teacherName:String
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
    studentGroupId:String,
    firstName: String,
    familyName: String,
    birthday: String,
  }
  type Mutation {
        createStudent (
        
            email: String,
            studentGroupId:String,
            firstName: String,
            familyName: String,
            birthday: String
            
        ) : ItemCreatedResponse!
        
        createCourse(
          name: String,
          description: String,
          teacherName:String
        ):ItemCreatedResponse

        createGrade (
            studentid: ID,
            courseid: ID,
            grade: String
        ) : ItemCreatedResponse!
  }
        type ItemCreatedResponse {
        success: Boolean!
    }


  `;

let s = 1;

  let students = [
  {
    id: s++,
    email: "jhon.sina@students.oamk.fi",
    firstName: "Jhon",
    familyName: "Sina",
    studentGroupId:"Din18sp",
    birthday: "10-12-1997",
  },
  {
    id: s++,
    email: "Fore.Ian@students.oamk.fi",
    firstName: "Fore",
    familyName: "Ian",
    studentGroupId:"Din17sp",
    birthday: "07-09-1996",
  },
  {
  id: s++,
  email: "Barbara.Okely@students.oamk.fi",
  studentGroupId:"Din16sp",
  firstName: "Barbara",
  familyName: "Okely",
  birthday: "01-03-1995",
},
{
  id: s++,
  email: "Scott.Peak@students.oamk.fi",
  firstName: "Scott",
  familyName: "Peak",
  studentGroupId:"Din17sp",
  birthday: "06-07-1994",
},

];

let c = 1;

let courses = [
    {
        id: c++,
        name: "ICT",
        description: "Basics Of Information Of Technology",
        teacherName:"Lasse"
    },
    {
        id: c++,
        name: "Android Development",
        description: "Basics Of Android Development",
        teacherName:"Temmu"
    },
    {
        id: c++,
        name: "Java",
        description: "Intermidate of Object Orientened Programming",
        teacherName:"Kari"
    }
];

let g = 1;

let grades = [
  {
      id: g++,
      studentid: 1,
      courseid: 2,
      grade: "5",
  },
  {
      id: g++,
      studentid: 1,
      courseid: 2,
      grade: "5.5",
  },
  {
      id:g++,
      studentid: 4,
      courseid: 1,
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
  },
  gradesByStudent: (parent, args, context, info) => {
    if (args.studentid) {
        return grades.filter(g => g.studentid === +args.studentid);
    }
  },
  gradesByCourse: (parent, args, context, info) => {
    if (args.courseid) {
        return grades.filter(g => g.courseid === +args.courseid);
    }
  }
}
};
//end of queries function

Mutation: {
  createStudent: (parent, args, context, info) => {
      const student = {
          id: ((students.length) + 1).toString(),
          firstName: args.firstName,
          familyName: args.familyName,
          studentGroupId:args.studentGroupId,
          email: args.email,
          birthday:args.birthday
          };
      students.push(student);
      return {success: true};
  }
  createCourse: (parent,args,context, info)=>{
    const course={
      id:((courses.length)+1).toString(),
      name:args.name,
      description:args.description,
      teacherName:args.teacherName
    };
    courses.push(course);
    return{success:true};

  }
  createGrade: (parent, args, context, info) => {
    const grade = {
        id: ((grades.length) + 1),
        studentid: args.studentid,
        courseid: args.courseid,
        grade: args.grade
    };
    grades.push(grade);
    return {success: true}
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