var fs = require('fs');
var crypto = require('crypto');
var model = require('./model');

/**
 * Create a hash from a file input
 * then pass it to exports.store
 */
exports.hash = function(file, cb){

  var shasum = crypto.createHash('sha256');
  var f = fs.ReadStream(file.path);

  f.on('data', function(d){
    shasum.update(d);
  });

  f.on('end', function(){
    var digest = shasum.digest('hex');
    console.log(digest + ' ' + file.path);
    exports.store(digest, file, cb);
  });

}

/**
 * Store file upload in mongodb
 * and generate necessary info
 * expects input param file to be
 * file object from multer
 */
exports.store = function(digest, file, cb){
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
