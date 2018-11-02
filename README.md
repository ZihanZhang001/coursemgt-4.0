# Assignment 1 - API testing and Source Control.

Name: Zihan Zhang

## Overview.

This project's API is standard RESTful, it includes: GET, PUT, POST and DELETE.

## API endpoints.

 + GET /courses - Get all courses.
 + GET /courses/:id - Get one course by id.
 + POST /courses - Add a new course
 + PUT /courses/:id/size - Increase size of a course.
 + DELETE /courses/:id - Delete one course.
 + 
 + GET /teachers - Get all teachers.
 + GET /teachers/:id - Get one teacher by id.
 + GET /teachers/courses /:id - Get all courses teached by a teacher by using populate function.
 + POST /teachers/ - Add a new teacher.
 + DELETE /teachers/:id - Delete one teacher.
 + 
 + GET /students - Get all students.
 + GET /students/:id - Get one student by id.
 + GET /students/fuzzystudent/:keyword - Get Find students by fuzzysearch.
 + GET /students/courses /:id - Get all courses learned by a student by using populate function.
 + POST /students/ - Add a new student.
 + PUT /students/:id/age - Increase age of a student.
 + DELETE /students/:id - Delete one student.

## Data storage.

courses.js:

        let mongoose = require('mongoose');
        let CoursesSchema = new mongoose.Schema({
                name: String,
                type: String,
                size: Number,
                room: String,
                time: Number,
            },
            { collection: 'courses' });
        module.exports = mongoose.model('Courses', CoursesSchema);
   
students.js:

        let mongoose = require('mongoose');
        let StudentsSchema = new mongoose.Schema({
                name: String,
                gender: String,
                age: Number,
                college: String,
                courses_id:[{type: mongoose.Schema.ObjectId, ref:'Courses'}]
            },
            { collection: 'students' });
        module.exports = mongoose.model('Students', StudentsSchema);
    
teachers.js:

        let mongoose = require('mongoose');
        let TeachersSchema = new mongoose.Schema({
                name: String,
                gender: String,
                courses_id:[{type: mongoose.Schema.ObjectId, ref:'Courses'}]
            },
            { collection: 'teachers' });
        module.exports = mongoose.model('Teachers', TeachersSchema);

## Sample Test execution.

        $ npm test

        > coursemgt-1.0@0.0.0 test /Users/zhangzihan/Desktop/coursemgt-4.0
        > NODE_ENV=test mocha test/routes/courses-test.js

          Courses
            GET /courses
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
              ✓ should return all the courses in an array
            POST /courses
              ✓ should return confirmation message and update datastore
            PUT /courses/:id/size
              ✓ should return a message and the course increment size by 1
              ✓ should return a 404 and a message for invalid donation id
            DELETE /courses/:id
              valid delete
                ✓ should delete a course
              invalid delete
                ✓ should return a 404 and a message for invalid course id


          6 passing (322ms)
        
        
        $ npm test

        > coursemgt-1.0@0.0.0 test /Users/zhangzihan/Desktop/coursemgt-4.0
        > NODE_ENV=test mocha test/routes/students-test.js

          Students
            GET /students
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
              ✓ should return all the students in an array
            GET /students/:id
              ✓ should return one student in an array
            GET /students/courses/:id
              ✓ should return reference courses taked by a student in an array
            GET /students/fuzzystudent/:keyword
              ✓ should return a student in an array by fuzzy search
            POST /students
              ✓ should return confirmation message and update datastore
            PUT /students/:id/age
              ✓ should return a message and the student increment age by 1
              ✓ should return a 404 and a message for invalid student id
            DELETE /students/:id
              valid delete
                ✓ should delete a student
              invalid delete
                ✓ should return a 404 and a message for invalid student id


          9 passing (593ms)
          
          
        $ npm test

        > coursemgt-1.0@0.0.0 test /Users/zhangzihan/Desktop/coursemgt-4.0
        > NODE_ENV=test mocha test/routes/teachers-test.js

          Teachers
            GET /teachers
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
        Connected to Database: mongodb://localhost/coursesdb-test
              ✓ should return all the teachers in an array
            GET /teachers/:id
              ✓ should return one teacher in an array
            GET /teachers/courses/:id
              ✓ should return reference courses teached by a teacher in an array
            POST /teachers
              ✓ should return confirmation message and update datastore
            DELETE /teachers/:id
              valid delete
                ✓ should delete a teacher
              invalid delete
                ✓ should return a 404 and a message for invalid teacher id


          6 passing (482ms)


[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
My testing codes have beforeEach hooks to make sure the isolation principle.They keep the silent principle, and has expectations about the target state as well as the target result/return value. Also, it has normal and error cases. I uses Branch-Edit-Merge workflow to complete the codes. In addition, SuperTest has been used.
