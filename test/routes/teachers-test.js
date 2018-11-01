process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/teachers');
let cor = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
let mongoose = require('mongoose');

describe('Teachers', function (){
    beforeEach(function(done){
        var newData=new datastore({
            _id:mongoose.Types.ObjectId("5bce37ee9f5b4f90ef56d037"),
            name:"David",
            gender:"male",
            courses_id:mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e")
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
    describe('GET /teachers',  () => {
        it('should return all the teachers in an array', function(done) {
            chai.request(server)
                .get('/teachers')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (teacher) => {
                        return { name: teacher.name }
                    });
                    expect(result).to.include( { name: "David" } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('POST /teachers', function () {
        it('should return confirmation message and update datastore', function(done) {
            let teacher = {
                name: "Dali" ,
                gender: "male",
                courses_id: mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f")
            };
            chai.request(server)
                .post('/teachers')
                .send(teacher)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Teacher Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/teachers')
                .end(function(err, res) {
                    let result = _.map(res.body, (teacher) => {
                        return { name: teacher.name };
                    }  );
                    expect(result).to.include( { name: 'Dali'} );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });
        });
    });
});