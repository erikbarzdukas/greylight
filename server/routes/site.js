exports.index = function(req, res, next){
  res.send('../client/index.html');
}

exports.samples = function(req, res, next){
  res.send('Shhh... samples live here');
}
