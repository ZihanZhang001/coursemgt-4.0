process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/students');
let cor = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
let mongoose = require('mongoose');

describe('Students', function (){
    beforeEach(function(done){
        var newData=new datastore({
            _id:mongoose.Types.ObjectId("5bc50b7bc6fff5975531bdb9"),
            name:"Abby",
            gender:"female",
            age:18,
            college:"Business",
            courses_id:[mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e"),mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f")]
        });
        newData.save(function(err){
            done();
        });
    });
    beforeEach(function(done){
        var newCor=new cor({
            _id:mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e"),
            name:"math",

        });
        newCor.save(function(err){
            done();
        });
    });
    beforeEach(function(done){
        var newCor1=new cor({
            _id:mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f"),
            name:"english",

        });
        newCor1.save(function(err){
            done();
        });
    });
    describe('GET /students',  () => {
        it('should return all the students in an array', function(done) {
            chai.request(server)
                .get('/students')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (students) => {
                        return { name: students.name,
                            age: students.age }
                    });
                    expect(result).to.include( { name: "Abby", age: 18  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    done();
                });

        });
    });
    describe('POST /students', function () {
        it('should return confirmation message and update datastore', function(done) {
            let student = {
                name: "Wang" ,
                gender: "male",
                age:19,
                college:"Business",
                courses_id: [mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f"),mongoose.Types.ObjectId("5bc4f61e82a78003ce4dc310")]
            };
            chai.request(server)
                .post('/students')
                .send(student)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Student Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/students')
                .end(function(err, res) {
                    let result = _.map(res.body, (student) => {
                        return { name: student.name };
                    }  );
                    expect(result).to.include( { name: 'Wang'} );
                    datastore.collection.drop();
                    done();
                });
        });
    });
});