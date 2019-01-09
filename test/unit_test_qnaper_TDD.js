// //mocha --ui tdd
//
// let Qnaper_Documents = require('../app/models/qnaper');
//
//
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
// let should = chai.should();
//
// chai.use(chaiHttp);
//
// suite('Unit test CRUD', function() {
//
//     setup(function() {
//         //Do setup before every tests
//         let doc_Allfields = {
//             "name": "Hsu",
//             "job": "employee",
//             "age": "24"
//         }
//         chai.request(server)
//             .post('/qnaper')
//             .send(doc_Allfields)
//             .end((err, res) => {
//
//             });
//     });
//
//     teardown(function() {
//         //Do after every tests
//         // Qnaper_Documents.remove({}, (err) => {
//         //     //Clean up the DB
//         // });
//     });
//
//     suite('/GET qnapers', function() {
//
//         test('it should GET all the qnapers', function() {
//
//             chai.request(server)
//                 .get('/qnaper')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('Array');
//                     // console.log(res.body)
//                     // console.log(typeof res.body)
//                     // res.body.length.should.be.eql(1);
//                 });
//
//         });
//     });
//
//     suite('/POST qnaper', function() {
//
//         test('it should POST a qnaper with only one field', function() {
//
//         });
//
//         test('it should POST a qnaper with all fields', function() {
//
//         });
//     });
//
//     suite('/GET/:id qnaper', function() {
//
//         test('it should GET a qnaper by the given id', function() {
//
//         });
//
//     });
//
//     suite('/PUT/:id qnaper', function() {
//
//         test('it should UPDATE a qnaper given the id', function() {
//
//         });
//
//     });
//
//     suite('/DELETE/:id qnaper', function() {
//
//         test('it should DELETE a qnaper given the id', function() {
//
//         });
//
//     });
//
//
// });