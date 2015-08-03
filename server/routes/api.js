var utils = require('../utils');

exports.get = function(req, res, next){
  res.send("Api is hooked up");
}

exports.post = function(req, res, next){
  utils.hash(req.file.path);
  res.sendStatus(200)
};
