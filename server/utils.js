var fs = require('fs');
var crypto = require('crypto');
var model = require('./model');

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
exports.store = function(file, cb){
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
