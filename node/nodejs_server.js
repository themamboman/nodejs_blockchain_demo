//---------------------------------------------------------------------
//
//	Filename - nodejs_server.js
//
//  This file is an example of nodejs running as a server - presenting
//  RESTful API endpoints 
//
//  Author: David Gentry
//  Date:   9/16/2018
//---------------------------------------------------------------------

//---------------------------------------------------------------------
// include the required libraries
var express = require('express');
var parser = require('body-parser');
var request = require('async-request');

//---------------------------------------------------------------------
// instantiate the objects
var app = express();

// other variables
var latestStats = {};
var latestUnconfTxs = {};
//---------------------------------------------------------------------
// local function that updates the latest stats locally
async function updLatestStats() {
	var response = null;
	
	try {
		// pull data via a web interface
		response = await request('https://blockchain.info/stats?format=json');
		latestStats = response.body;

	} catch (e){
		console.log("Exception caught in updLatestStats: " + e.message);
	}
}

//---------------------------------------------------------------------
// local function that updates the latest unconfirmed transactions
async function updUnconfirmedTx() {
	var response = null;
	
	try {
		response = await request('https://blockchain.info/unconfirmed-transactions?format=json');
		latestUnconfTxs = response.body;
	} catch (e) {
		console.log("Exception caught in updUnconfirmedTx: " + e.message);
	}
}

//---------------------------------------------------------------------
// local function to Add cross origin headers 
function addCORSHeaders(resp) {
   var res = resp;
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
   return (res);
}
//---------------------------------------------------------------------
// create API endpoints

// Test endpoint  
// 		type: GET
// 		returns: text only
app.get('/test', function (req, res) {
	console.log('Test API called');		// print to the nodejs console
	res.send('Hello World!');			// print to the caller (browser or curl)
});

// showlateststats 
//		type: GET
// 		returns: JSON struct with everything
app.get('/showlateststats', async function (req, res) {
	console.log('Call to get latest blockchain stats');
	await updLatestStats();				// get the latest stats, wait for the response before continuing
	res = addCORSHeaders(res);			// in case we are running the nodejs server on the same machine, get around cross domain restrictions
	res.send(latestStats);				// return the JSON structure to the caller
});

app.get('/showunconftxs', async function (req, res) {
	console.log('Call to get latest unconfirmed transactions');
	await updUnconfirmedTx();
	res = addCORSHeaders(res);
	res.send(latestUnconfTxs);
});

//---------------------------------------------------------------------
// Finally, start the listener
app.listen(80, function() {
	console.log('Example app listening on port 80!');
});