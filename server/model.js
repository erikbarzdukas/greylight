var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/greylight');

exports.File = mongoose.model('File', {
  filename: String,
  digest: String,
  location: String,
  VTreport: String,
});
