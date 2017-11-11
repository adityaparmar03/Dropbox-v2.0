var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    User.find({$or:[{email:{$regex : msg.index, $options : 'i'}},
                    {firstname:{$regex : msg.index , $options : 'i'}},
                    {lastname:{$regex : msg.index , $options : 'i'}}]}, function(err, users) {
                    
                        if (err){
                            callback(null, {
                                msg : 'System Error, Please try later.',
                                status : 'error'
                            });
                        }
                        callback(null, {
                            users:users
                        });

    })
}
exports.handle_request = handle_request;