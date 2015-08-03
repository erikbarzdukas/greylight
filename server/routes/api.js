var utils = require('../utils');
var file = require('../model');

exports.get = function(req, res, next){
  res.send("Api is hooked up");
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
