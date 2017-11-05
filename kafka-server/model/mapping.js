var mongoose = require('mongoose');

module.exports = mongoose.model('Mapping',{

    parentfolderid: String,
    contentid: String

});