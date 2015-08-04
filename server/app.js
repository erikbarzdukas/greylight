/**
 * All dem modules
 */
var express = require('express');
var path = require('path');
var app = express();
var multer = require('multer');
var api = require('./routes/api');
var site = require('./routes/site');
var utils = require('./utils');
var upload = multer({dest: 'server/uploads/'});

/* Middleware  */
//app.use(express.static('server/static'));
app.use(express.static('server/client'));
app.use(express.static('server/uploads'));

/* GETS */
app.get('/', site.index);
app.get('/api/files', api.getFiles);
app.get('/api/files/:digest', api.getByDigest);
app.get('/api/scans', api.getScans);

/* POSTS */
app.post('/api', upload.single('filedata'), api.post);



/**
 * Here be dragons.
 * And server configs
 */
var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Listening on http://%s:%s", host, port);
});
