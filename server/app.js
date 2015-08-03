/**
 * All dem modules
 */
var express = require('express');
var path = require('path');
var app = express();
var api = require('./routes/api');
var site = require('./routes/site');

/**
 * Middleware
 */
app.use(express.static('./static'));


/* GETS */
app.get('/', site.index);
app.get('/samples', site.samples);

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
