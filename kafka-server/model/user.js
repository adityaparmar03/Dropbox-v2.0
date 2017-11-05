var mongoose = require('mongoose');

module.exports = mongoose.model('User',{

   email: String,
   password: String,
   firstname: String,
   lastname:String
});