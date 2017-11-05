var mongoose = require('mongoose');

module.exports = mongoose.model('Content',{

    originalname:String,
    virtualname:String,
    date:String,
    star:String,
    type:String,
    userid:Number
});