exports.get = function(req, res, next){
  res.send("Api is hooked up");
}

exports.post = function(req, res, next){
  res.sendStatus(200)
};
