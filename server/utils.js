var fs = require('fs');
var crypto = require('crypto');
var model = require('./model');
var Promise = require('bluebird');
var http = require('http');
var config = require('./config');

/**
 * Create a hash from a file input
 * then pass it to exports.store
 */
exports.hash = function(filePath){

  var shasum = crypto.createHash('sha256');
  var f = fs.readFileSync(filePath);

  shasum.update(f);

  return shasum.digest('hex');
}

/**
 * Store file upload in mongodb
 * and generate necessary info
 * expects input param file to be
 * file object from multer
 */
exports.storeFile = function(file, cb){
  var digest = exports.hash(file.path);
 
  /* Get scan for file if it doesn't exist */ 
  getScan(digest);

  var File = new model.File({
    filename: file.originalname,
    digest: digest,
    location: file.path
  });

  File.save(function(err){
    if(err){
      cb(err);
    } else {
      cb(null);
    }
  });
}

/**
 * Get a scan from the Virus Total api
 * for a file if it does not exist in database
 * Expects a sha256 hash
 */
var getScan = function(digest) {
  var promise = model.Scan.find({digest : digest}).exec();
  promise.then(function(docs) {
    if(docs.length < 1) {
      
      var postData = JSON.stringify({
        "apikey" : config.virusTotalApiKey,
        "resource" : digest
      });
      console.log(postData);

      var options = {
        hostname: "www.virustotal.com",
        path: "/vtapi/v2/file/report",
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      
      var req = http.request(options, function(res) {
        console.log("Status ", res.statusCode);
        console.log("Headers ", JSON.stringify(res.headesr));
        res.setEncoding('UTF8');
        res.on('data', function(chunk) {
          console.log("Body ", chunk);
        });
      });
      
      req.on('error', function(err) {
        console.log("Error with request ", "\n", err.message);
        console.log(err.stack);
      });
      
      req.write(postData);
      req.end();
    }
  });
}


/**
 * Stores scans -> updates if scan exists
 * Expects a scan object that matches Virus Total docs
 */
/* Promisified way to retrieve scan docs */
var storeScan = function(scan){
  var promise = model.Scan.find({digest : scan.sha256}).exec();
  promise.then(function(docs){
    if(docs.length < 1) {
      var newScan = new Scan({
        scan: scan
      });
      newScan.save();
    } else {
      docs[0].scan = scan;
      docs[0].save();
    }
  });
}
