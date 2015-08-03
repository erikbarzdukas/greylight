var utils = require('../utils');
var model = require('../model');

/* Return JSON of all files in DB */
exports.get = function(req, res, next){

  model.File.find(function(err, files){
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(files);
    }
  });
}

/* Return JSON of all files that have digest param */
exports.getByDigest = function(req, res, next){
  
  model.File.find({ digest: req.params.digest}, function(err, files){
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(files);
    }
  });
}

/* Handle upload of a file */
exports.post = function(req, res, next){
  
  utils.store(req.file, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};
