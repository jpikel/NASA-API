  /*Filename: webpage.js
	Author: Johannes Pikel
	Date: 2016.11.07
	Description: js script that will run our server to get requests from
	NASA API
	Class: CS290-400
	Assignment: How to guide
	Due Date: 2016.11.16
	*/
	
	
//express so we may access an easy framework of functions to interact with clients
	
	var express = require('express');
	var app = express();

//bodyParser allows parsing of POST to this server
//both JSON and x-www-form-urlencoded
	
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
//set the port for our server to listen on	

	app.set('port', 6821);

//set the app engine to render html files
	app.set('view options', {layout: false});
	app.use(express.static(__dirname));

app.get('/',function(req,res){
	res.render('index');
});

	
//404 page if a page is not found
app.use(function(req,res){
	res.status(404);
	res.send("404 - File not found");
});

//server error page render
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.send("500 - Server error");
});

//start the server on port assigned previously
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});

