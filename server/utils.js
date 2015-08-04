var fs = require('fs');
var crypto = require('crypto');
var model = require('./model');
var Promise = require('bluebird');

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
