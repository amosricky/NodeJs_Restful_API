let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8081;
let qnaper_router = require('./app/routes/qnaper');
let config = require('config');


//db connection      
mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

//use it to show log
// app.use(morgan('combined'));

app.get("/", (req, res) => res.json({message: "Welcome to Qnap!"}));

app.route("/qnaper")
	.get(qnaper_router.getQnapers)
	.post(qnaper_router.postQnaper);
app.route("/qnaper/:id")
	.get(qnaper_router.getQnaper)
	.delete(qnaper_router.deleteQnaper)
	.put(qnaper_router.updateQnaper);


app.listen(port);
console.log("Listening on port " + port);

//exports it for unit test
module.exports = app;