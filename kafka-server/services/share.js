var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');
var Mapping = require('../model/mapping')
var mongoose = require('mongoose');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    /*User.find({$or:[{email:/^pat/},{firstname:/^A/},{lastname:/^pat/}]}, function(err, users) {
        if (err){
            callback(null, {
                msg : 'System Error, Please try later.',
                status : 'error'
            });
        }
        callback(null, {
            users:users
        });

    })*/
    msg.users.map(function(user,index){
        var user = user;
        Content.findOne({ 'userid' :  user._id , 'originalname':'root' }, function(err, rootdata) {
            if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
            
            // Mapping with Rootid of indiviual member 
            var mapping = new Mapping();
            mapping.parentfolderid = rootdata._id;
            mapping.contentid = msg.contentid ;
            mapping.save(function(err,mapping) {
                if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
              
                Content.findByIdAndUpdate(msg.contentid,
                    { "$push": { "members": user } },
                    function (err, data) {
                        if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
                        callback(null, {
                            msg : 'Successfully shared.',
                            status : 'success'
                        });          
                    }
                );
            });
            
        });

    });
}
exports.handle_request = handle_request;