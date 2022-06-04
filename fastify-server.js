/*
    CIT 281 Lab 5
    Name: Melinda Chan
*/

const fs = require("fs");
const fastify = require("fastify")();

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// unlike my previous attempt the one below lets say getStudentId(2):
// * for loop will run and output the first student id:1 object, since stu.id = 1 but fx id = 2
// * it will not return stu, there is no else statement to end the loop so after passing through if for loop will just go on to next object in array aka id:2
function getStudentId(id) {
  for (let stu of students) { // stu will output loop through the objects in array "students"
    console.log(stu); 
    if (stu.id === id) { // if statement under for loop, loop will check if each stu.id (which will loop through 1, 2, and 3) matches the id parameter in function
      return stu; // if the id parameter matches an id in the students array then return the object in the array with that id
    } 
  }
  return null;
};

fastify.get("/cit/student", (request, reply) => {
  reply
      .code(200) // status code 
      .header("Content-Type", "application/json; charset=utf-8") // MIME type needs to match what you send
      .send(students); // don't need string literal because students is an array
});

fastify.get("/cit/student/:id", (request, reply) => {
  console.log(request);
    let { id } = request.params; // how to use parseInt with const?
    id = parseInt(id); // converts stirng to number 
    let response = getStudentId(id);
    if (response !== null) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(response);
    } else {
        reply
            .code(404)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("<h1>Not Found<h1>")
           // before I tried to send "not found" and only not found appeared, 404 didn't (works with .send(err))
            
    
    }
});

fastify.get("/cit/*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Not Found</h1>");
});

function getLastID() {
  return students[students.length - 1].id;
}
// console.log(getLastID());

fastify.post("/cit/student/", (request, reply) => {
  // const { id } = request.params;
  const { last, first  } = request.body;
  students.push({id: getLastID() + 1, first, last});
  console.log(students);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

// Starts server and listens to requests
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
})

/* This did not work:
// * if getStudentId(id) - no matter the id console.log would always output first student then return null
// * lets say getStudentId(2)
// * for loop loops through student id: 1 first, since stu.id = 1 is not equal to fx id = 2
// * it moves to else which says to return null, however this is within the for loop so it cuts off the for loop after one iteration

function getStudentId(id) {
  for (let stu of students) { 
    console.log(stu);
    if (stu.id == id) { 
      return stu; 
    } else {
      return null; 
    }
  }
}

*/
