var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');

function handle_request(msg, callback){
    console.log("Profile In handle request:"+ JSON.stringify(msg.body));
    var query = {'_id':msg.body.user.userid};
   
    User.findOneAndUpdate(query, msg.body.user, {upsert:true}, function(err, doc){
        
                        if (err){
                            callback(null, {
                                msg : 'System Error, Please try later.',
                                status : 'error'
                            });
                        }
                        callback(null, {
                            msg : 'Account Successfully updated.',
                            status : 'success'
                        });

    })
}
exports.handle_request = handle_request;