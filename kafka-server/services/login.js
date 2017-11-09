var User = require('../model/user');
var Content = require('../model/content');
var bCrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

   
   
    console.log("In handle request:"+ JSON.stringify(msg));
    User.findOne({ 'email' :  msg.username }, function(err, user) {
        var res = {};
       
        if (err){
            callback(null, {
                msg : 'System Error, Please try later.',
                status : 'error'
            }); 
        }
        else if (!user){
            callback(null, {
                msg : 'Invalid Username.',
                status : 'error'
            });                    
        }else if (!isValidPassword(user,msg.password)){
            callback(null, {
                msg : 'Invalid Password.',
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
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}
exports.handle_request = handle_request;