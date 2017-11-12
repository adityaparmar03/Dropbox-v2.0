var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');
var Mapping = require('../model/mapping');
var Activitylog = require('../model/acitivitylog');

function handle_request(msg, callback){

     
            var content = new Content();
            content.originalname = msg.foldername;
            content.virtualname = msg.foldername;
            content.date = getDate();
            content.star = "no";
            content.type = "folder";
            content.userid = msg.userid;

            content.save(function(err,content) {
                if (err){
                    callback(null, {
                        msg : 'System Error, Please try later.',
                        status : 'error'
                    });
                }
               
                var contentid = content.id

                var mapping = new Mapping();
                mapping.parentfolderid = msg.parentfolderid;
                mapping.contentid = contentid ;

                mapping.save(function(err,mapping) {
                    if (err){
                        callback(null, {
                            msg : 'System Error, Please try later.',
                            status : 'error'
                        });
                    }
                    Content.findOne({ '_id' :  contentid }, function(err, content) {
                            if (err){
                                callback(null, {
                                    msg : 'System Error, Please try later.',
                                    status : 'error'
                                });
                            } 

                            var acitivitylog = new Activitylog();
                            acitivitylog.activity = content.originalname+" "+content.type+" "+"created."
                            acitivitylog.date = getDate();
                            acitivitylog.userid = content.userid;
                            acitivitylog.save();


                            callback(null, {
                                content:content,
                                msg : 'Folder successfully uploaded.',
                                status : 'success'
                            });
                        })  
                    });
        
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