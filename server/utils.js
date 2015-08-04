var fs = require('fs');
var crypto = require('crypto');
var model = require('./model');
var Promise = require('bluebird');
var http = require('http');
var config = require('./config');
var Formdata = require('form-data');

/**
 * Create a hash from a file input
 * then pass it to exports.store
 */
exports.hash = function(filePath){

  var shasum = crypto.createHash('sha256');
  var f = fs.readFileSync(filePath);

  shasum.update(f);

  return shasum.digest('hex');
};

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
};

/**
 * Get a scan from the Virus Total api
 * for a file if it does not exist in database
 * Expects a sha256 hash
 */
var getScan = function(digest) {
  var promise = model.Scan.find({digest : digest}).exec();
  promise.then(function(docs) {
    if(docs.length < 1) {
     
      var form = new Formdata();
      var url = 'https://www.virustotal.com/vtapi/v2/file/report';

      form.append('apikey', config.virusTotalApiKey);
      form.append('resource', digest);

      form.submit(url, function(err, res) {
        var data;
        console.log("Status ", res.statusCode);
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          storeScan(JSON.stringify(data));
        });
      });
    }
  });
};

/**
 * Stores scans -> updates if scan exists
 * Expects a scan object that matches Virus Total docs
 */
/* Promisified way to retrieve scan docs */
var storeScan = function(scan){
  scan.replace('undefined', '');
  console.log(scan);
  var scan = JSON.parse(scan);

  var promise = model.Scan.find({resource: scan.sha256}).exec();
  promise.then(function(docs){
    console.log(docs[0].scan.sha256);
    if(docs.length < 1) {
      var newScan = new model.Scan({
        resource: scan.resource,
        md5: scan.md5,
        sha1: scan.sha1,
        sha256: scan.sha256,
        scan_date: scan.scan_date,
        positives: scan.positives,
        total: scan.total,
        scans: scan.scans,
        permalink: scan.permalink
      });
      console.log(newScan);
      newScan.save();
    } else {
      docs[0].scan = scan;
      docs[0].md5 = scan.md5,
      docs[0].sha1 = scan.sha1,
      docs[0].sha256 = scan.sha256,
      docs[0].scan_date = scan.scan_date,
      docs[0].positives = scan.positives,
      docs[0].total = scan.total,
      docs[0].scans = scan.scans,
      docs[0].permalink = scan.permalink,
      docs[0].save();
    }
  });
};
