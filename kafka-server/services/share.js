var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var Content = require('../model/content');
var Mapping = require('../model/mapping')
var mongoose = require('mongoose');
var Activitylog = require('../model/acitivitylog');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
   
    msg.users.map(function(user,index){
        var user = user;
        Content.findOne({ 'userid' :  user._id , 'originalname':'root' }, function(err, rootdata) {
            if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
            
            // Mapping with Rootid of indiviual member 
            var mapping = new Mapping();
            mapping.parentfolderid = rootdata._id;
            mapping.contentid = msg.contentid._id ;
            mapping.save(function(err,mapping) {
                if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
              
                Content.findByIdAndUpdate(msg.contentid,
                    { "$addToSet": { "members": user } },
                    function (err, data) {
                        if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
                       
                        var acitivitylog = new Activitylog();
                        acitivitylog.activity = msg.contentid.originalname+" "+msg.contentid.type+" "+"shared with "+user.firstname+" "+user.lastname+"."
                        acitivitylog.date = getDate();
                        acitivitylog.userid = msg.sender_userid;
                        acitivitylog.save();

                        callback(null, {
                            msg : ' Sharing successfully completed.',
                            status : 'success'
                        });          
                    }
                );
            });
            
        });

    });
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