var utils = require('../utils');
var model = require('../model');

exports.get = function(req, res, next){

  model.File.find(function(err, files){
    res.json(files);
  });
}

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
