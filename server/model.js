var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/greylight');

exports.File = mongoose.model('File', {
  filename: String,
  digest: {type: String, unique: true},
  location: String,
  VTreport: String,
});

exports.Scan = mongoose.model('Scan', {
  scan: Object,
});
