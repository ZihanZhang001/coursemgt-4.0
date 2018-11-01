process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Courses', function (){
    beforeEach(function(done){
        var newData=new datastore({
            name:"math",
            type:"P",
            size:16,
            room:"A01",
            time:9.15
        });
        newData.save(function(err){
            done();
        });
    });
    describe('GET /courses',  () => {
        it('should return all the courses in an array', function(done) {
            chai.request(server)
                .get('/courses')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            type: course.type }
                    });
                    expect(result).to.include( { name: "math", type: "P"  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    done();
                });

        });
    });
    describe('POST /courses', function () {
        it('should return confirmation message and update datastore', function(done) {
            let course = {
                name: "chinese" ,
                type: "p",
                size: 20,
                room:"A03",
                time:10.15
            };
            chai.request(server)
                .post('/courses')
                .send(course)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Course Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/courses')
                .end(function(err, res) {
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            size: course.size };
                    }  );
                    expect(result).to.include( { name: 'chinese', size: 20  } );
                    datastore.collection.drop();
                    done();
                });
        });
    });
});