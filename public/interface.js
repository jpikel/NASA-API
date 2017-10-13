  /*Filename: interface.ks
	Author: Johannes Pikel
	Date: 2016.11.07
	Description: js script that will run our server to get requests from
	NASA API
	Class: CS290-400
	Assignment: How to guide
	Due Date: 2016.11.16
	*/
	
	var apiKey = "api_key="; 
	//Or DEMO_KEY
	
//express so we may access an easy framework of functions to interact with clients
	
	var express = require('express');
	var app = express();

	var https = require('https');
	var fs = require('fs');

	var options = {
	key: fs.readFileSync(__dirname + 'key'),
	cert: fs.readFileSync(__dirname + 'cert')
	};

	

//bodyParser allows parsing of POST to this server
//both JSON and x-www-form-urlencoded
	
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
//set the port for our server to listen on	

	app.set('port', 8443);

//This is the GET request to the url:port#/apod of our server
//So once the browser goes to the url of our server at port # / apod
//this app will respond
//We'll use this for the request to the Astronomy Picture of the Day or APOD

app.get('/apod',function(req,res){
	
	var url = "https://api.nasa.gov/planetary/apod?";

	//get queries from the user
	if(Object.keys(req.query).length !== 0){
		url += "date=";
		url += req.query["date"];
		url += "&";
	}
//concatanate the url and apikey
//This will become important later
	url += apiKey;
	
	//Create a new XMLHttpRequest that is used for the GET request to NASA
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var req = new XMLHttpRequest();
	
	//open our request asynchronously
	req.open("GET", url, true);
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	//we add an eventListener to wait until data returned
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
			//Once the Date is received from NASA send it back to the client
			res.send(req.responseText);
		} else {
			res.send("Server error or incorrect query");
		}
	});
	req.send(null);
});

//This function handles gets to the /manifests page
//This will request the mission manifest from NASA Mars-Rovers API
//If the query from the client is blank then we'll default to Curiosity
//If a wrong query is submitted we'll notify the client
//Query should be submitted as name=rover
app.get('/manifests', function(req,res){
	var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/";

	if(Object.keys(req.query).length != 0){
		url += req.query["name"];
	} else {
		url += "curiosity";
	}

	url += "?"  + apiKey;
	//used for the GET request
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var req = new XMLHttpRequest();
	
	//open our request asynchronously
	req.open("GET", url, true);
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	//we add an eventListener to wait until data returned
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
//			console.log(req);
			res.send(req.responseText);
		} else {
			res.send("Server error or incorrect query");
		}
	});
	req.send(null);
});

//This function will serve as the pass through to get a request from
//NASA Mars Rover API within a specific directory
//To keep most of the work in our fiddle it will expect a few queries
//dir=directory/photos
//sol=solday
//camera=camera chosen
//The only thing this app.get() will do is append the api_key
app.get('/roverpics', function(req, res){
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

	res.setHeader('Access-Control-Allow-Origin', '*');

	if(Object.keys(req.query).length != 0){
		url += req.query["dir"] 
		url += "?sol=" + req.query["sol"] 
		url += "&camera=" + req.query["camera"]+ "&" + apiKey;
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var req = new XMLHttpRequest();

		//open our request asynchronously
		req.open("GET", url, true);
	
		//we add an eventListener to wait until data returned
		req.addEventListener('load', function(){
			if(req.status >=200 && req.status < 400){
				res.send(req.responseText);
			} else {
				res.status(400);
				res.send(req.responseText);
				//console.log(req);
			}
		});
		req.send(null);
	}
	else {
		res.send("No queries submitted cannot submit to NASA API");
	}

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

https.createServer(options, app).listen(app.get('port'), function(){
	console.log('Started on port: '+app.get('port'));
});
