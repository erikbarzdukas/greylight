/**
 * All dem modules
 */
var express = require('express');
var app = express();
var api = require('./routes/api');

/* GETS */
app.get('/', function(req, res){
  res.send("Welcome to GreyLight");
});

app.get('/samples', function(req, res){
  res.send("Shh.. samples live here.");
});

app.get('/api', api.get);
/* POSTS */



/**
 * Here be dragons.
 * And server configs
 */
var port = process.env.PORT || 3000

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Listening on http://%s:%s", host, port)
});
