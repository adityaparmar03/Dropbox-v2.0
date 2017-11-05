var User = require('../model/user');

function handle_request(msg, callback){

   
   
    console.log("In handle request:"+ JSON.stringify(msg));
    User.findOne({ 'email' :  msg.username }, function(err, user) {
        var res = {};
        // In case of any error, return using the done method
        console.log("user:-"+user)
        if (err){
            callback(null, {
                msg : 'System Error, Please try later.',
                status : 'error'
            }); 
        }
        else if (!user){
            callback(null, {
                msg : 'Username Invalid.',
                status : 'error'
            });                    
        }else if (msg.password != 1234){
            callback(null, {
                msg : 'Username Password.',
                status : 'error'
            });
        }else{ 
            callback(null, {
                user:user,
                msg : 'successful login.',
                status : 'success'
            });
        }
        
    }
);



   
}

exports.handle_request = handle_request;