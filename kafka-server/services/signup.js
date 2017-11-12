var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');

function handle_request(msg, callback){

   
   
    console.log("In handle request:"+ JSON.stringify(msg));
    User.findOne({ 'email' :  msg.email }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
        callback(null, {
            msg : 'System Error, Please try later.',
            status : 'error'
        });
    }
    // already exists
    if (user) {
        callback(null, {
            msg : 'Account already exist.',
            status : 'error'
        });    
    } else {
        var newUser = new User()
        newUser.email = msg.email
        newUser.password = createHash(msg.password)
        newUser.firstname = msg.firstname
        newUser.lastname = msg.lastname
        newUser.all = msg.firstname+" "+msg.lastname+" ("+msg.email+")"
        newUser.aboutme="";
        newUser.interests="";
        
        // save the user
        newUser.save(function(err,user) {
            if (err){
                callback(null, {
                    msg : 'System Error, Please try later.',
                    status : 'error'
                });
            }
            var content = new Content();
            content.originalname = "root";
            content.virtualname = "root";
            content.date = getDate();
            content.star = "no";
            content.type = "folder";
            content.userid = user.id;

            content.save();
            callback(null, {
                msg : 'Account created successfully',
                status : 'success'
            });
            
        });

    }
});


   
}
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
function getDate(){
    
        function twoDigits(d) {
            if(0 <= d && d < 10) return "0" + d.toString();
            if(-10 < d && d < 0) return "-0" + (-1*d).toString();
            return d.toString();
        }
        
        Date.prototype.toMysqlFormat = function() {
            return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
         
        var date = Date().toString();
        return date;
    
    }

exports.handle_request = handle_request;