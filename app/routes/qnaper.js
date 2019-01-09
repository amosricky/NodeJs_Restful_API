let mongoose = require('mongoose');
let Qnaper_Documents = require('../models/qnaper');



//get all qnapers
function getQnapers(req, res) {
	//query collection in DB
	let query = Qnaper_Documents.find({});
	query.exec((err, qnapers) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(qnapers);
	});
}

//post a qnaper
function postQnaper(req, res) {
	//Creates a new Qnaper
	var newQnaper = new Qnaper_Documents(req.body);
	//Save it into the DB.
	newQnaper.save((err,qnaper) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Qnaper successfully added!", qnaper });
		}
	});
}

//get a qnaper by id
function getQnaper(req, res) {
	Qnaper_Documents.findById(req.params.id, (err, qnaper) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(qnaper);
	});		
}

//delete a qnaper by id
function deleteQnaper(req, res) {
	Qnaper_Documents.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Qnaper successfully deleted!", result });
	});
}

//update a qnaper by id
function updateQnaper(req, res) {
	Qnaper_Documents.findById({_id: req.params.id}, (err, qnaper) => {
		if(err) res.send(err);
		Object.assign(qnaper, req.body).save((err, qnaper) => {
			if(err) res.send(err);
			res.json({ message: 'Qnaper updated!', qnaper });
		});	
	});
}

//export all functions
module.exports = { getQnapers, postQnaper, getQnaper, deleteQnaper, updateQnaper };