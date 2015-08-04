var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/greylight');

exports.File = mongoose.model('File', {
  filename: String,
  digest: {type: String, unique: true},
  location: String,
  VTreport: String,
});

exports.Scan = mongoose.model('Scan', {
  md5 : String,
  sha1: String,
  sha256: String,
  scan_date: Date,
  positives: Number,
  total: Number,
  scans: Object,
  permalink: String,
  resource: String
});
