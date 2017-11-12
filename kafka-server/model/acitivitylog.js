var mongoose = require('mongoose');

module.exports = mongoose.model('Activitylog',{

   activity: String,
   date:String,
   userid:String
});