var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var LinkSchema = new mongoose.Schema({
  url: String,
  title: String,
  visits: Number,
  base_url: String,
  link: String,
  code: String
});

LinkSchema.pre('save', function(next){
      var shasum = crypto.createHash('sha1');
      shasum.update(this.url);
      this.code = shasum.digest('hex').slice(0, 5);
      next(); 
});

var Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
