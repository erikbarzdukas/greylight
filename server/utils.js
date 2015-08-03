var fs = require('fs');
var crypto = require('crypto');

/**
 * Create a hash from a file input
 */
exports.hash = function(file, hashAlgo){

  var shasum = crypto.createHash('sha256');
  var f = fs.ReadStream(file);

  f.on('data', function(d){
    shasum.update(d);
  });

  f.on('end', function(){
    var digest = shasum.digest('hex');
    console.log(digest + ' ' + file);
  });

}
