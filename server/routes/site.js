exports.index = function(req, res, next){
  res.send('Welcome to GreyLight');
}

exports.samples = function(req, res, next){
  res.send('Shhh... samples live here');
}
