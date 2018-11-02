# Assignment 1 - API testing and Source Control.

Name: ... your name ...

## Overview.

...... A statement of the API's context and objectives (just a paragraph)........

## API endpoints.
 . . . . . List the API's endpoints and state the purpose of each . . . . 
 
 e.g.

 + GET /students - Get all students.
 + GET /students/course/:id - Get all students on a particular course.
 + POT /students/:id/cert - Update specific student's list of sick certificates
 + etc
 + etc

## Data storage.
. . . . This section is only relevant if your tests included the integration of MongoDB (or other database) with the API. It should specify the database schema, i.e. JSON document structure for each collection type in the MongoDB database.

## Sample Test execution.
. . . . . In this section include a listing of the output from running your tests, e.g.

        $ npm test

        > donationweb-3.0@0.0.0 test /Users/diarmuidoconnor/labs/donationsApp
        > mocha test/routes/donations-test.js

          Donationss
            GET /donations
              ✓ should GET all the donations (48ms)
            POST /donations
              ✓ should return confirmation message and update datastore (136ms)
            PUT /donations/:id/votes
              ✓ should return all donations with specified donation upvoted by 1
              ✓ should return a 404 status and message for invalid donation id


          4 passing (207ms)

        $

[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
. . . . Briefly state any extra features of your testing that you feel should be high-lighted . . . . .
