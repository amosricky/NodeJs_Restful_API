// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Qnaper_Documents = require('../app/models/qnaper');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Unit test CRUD', () => {


    beforeEach((done) => { //Before each test we empty the database
        Qnaper_Documents.remove({}, (err) => {
            done();
        });
    });


    //test /GET
    describe('/GET qnapers', () => {
        it('it should GET all the qnapers', (done) => {
            chai.request(server)
                .get('/qnaper')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    //test /Post
    describe('/POST qnaper', () => {
        it('it should POST a qnaper with only one field', (done) => {
            let doc_Onlyname = {
                name: "Only name"
            }
            chai.request(server)
                .post('/qnaper')
                .send(doc_Onlyname)
                .end((err, res) => {
                    res.body.should.have.property('_message').eql('qnaper validation failed');
                    done();
                });
        });
        it('it should POST a qnaper with all fields', (done) => {
            let doc_Allfields = {
                "name": "Hsu",
                "job": "employee",
                "age": "24"
            }
            chai.request(server)
                .post('/qnaper')
                .send(doc_Allfields)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Qnaper successfully added!');
                    res.body.qnaper.should.have.property('name');
                    res.body.qnaper.should.have.property('job');
                    res.body.qnaper.should.have.property('age');
                    done();
                });
        });
    });


   //test /GET/id
    describe('/GET/:id qnaper', () => {
        it('it should GET a qnaper by the given id', (done) => {
            let doc_Allfields = new Qnaper_Documents({ "name": "Hsu", "job": "employee", "age": "24" });
            doc_Allfields.save((err, qnaper_callback) => {
                chai.request(server)
                    .get('/qnaper/' + qnaper_callback.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('job');
                        res.body.should.have.property('age');
                        res.body.should.have.property('_id').eql(qnaper_callback.id);
                        done();
                    });
            });

        });
    });


   //test Put
    describe('/PUT/:id qnaper', () => {
        it('it should UPDATE a qnaper given the id', (done) => {
            let doc_Allfields = new Qnaper_Documents({ "name": "Hsu", "job": "employee", "age": "24" });
            doc_Allfields.save((err, qnaper_callback) => {
                chai.request(server)
                    .put('/qnaper/' + qnaper_callback.id)
                    .send({ "name": "NewHsu", "job": "boss", "year": "24" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Qnaper updated!');
                        res.body.qnaper.should.have.property('age').eql(24);
                        done();
                    });
            });
        });
    });


    //test /Delete
    describe('/DELETE/:id qnaper', () => {
        it('it should DELETE a qnaper given the id', (done) => {
            let doc_Allfields = new Qnaper_Documents({ "name": "Hsu", "job": "employee", "age": "24" });
            doc_Allfields.save((err, qnaper_callback) => {
                chai.request(server)
                    .delete('/qnaper/' + qnaper_callback.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Qnaper successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
