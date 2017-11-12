
var Mapping = require('../model/mapping');
var Content = require('../model/content');
var Activitylog = require('../model/acitivitylog');

function handle_request(msg, callback){
    console.log("In delete handle request:"+ JSON.stringify(msg.body));

    if(msg.body.file.type ==="file"){

        if(msg.body.file.userid === msg.body.userid){
            Content.findByIdAndRemove({ _id: msg.body.file._id }, function (err) {
                if (err){
                    callback(null, {
                        msg : 'System Error, Please try later.',
                        status : 'error'
                    });
                }
                var acitivitylog = new Activitylog();
                acitivitylog.activity = msg.body.file.originalname+" "+msg.body.file.type+" "+"deleted."
                acitivitylog.date = getDate();
                acitivitylog.userid = msg.body.userid;
                acitivitylog.save();

                callback(null, {
                    msg : msg.body.file.originalname+' file deleted successfully.',
                    status : 'success'
                });
              });

           
        }
        else{
            callback(null, {
                msg : 'You are not authorise person to perform this task.',
                status : 'error'
            });
        }
            
    }else {
        if(msg.body.file.members.length > 0){
            Mapping.findOne({parentfolderid:msg.body.parentfolderid , contentid:msg.body.file._id}, function(err, data) {
                if (err){
                     callback(null, {
                         msg : 'System Error, Please try later.',
                         status : 'error'
                     });
                 }
                 console.log("deleteid"+data._id )
                 Mapping.findByIdAndRemove({ _id: data._id }, function (err) {
                     if (err){
                         callback(null, {
                             msg : 'System Error, Please try later.',
                             status : 'error'
                         });
                     }

                     var acitivitylog = new Activitylog();
                     acitivitylog.activity = msg.body.file.originalname+" "+"group"+" "+"left."
                     acitivitylog.date = getDate();
                     acitivitylog.userid = msg.body.userid;
                     acitivitylog.save();

                     callback(null, {
                         msg : 'Delete successfully, But folder is still shared with other members.',
                         status : 'success'
                     });
                   });

                })
                    
        }
        else{
            if(msg.body.file.userid === msg.body.userid){
                Content.findByIdAndRemove({ _id: msg.body.file._id }, function (err) {
                    if (err){
                        callback(null, {
                            msg : 'System Error, Please try later.',
                            status : 'error'
                        });
                    }
                    var acitivitylog = new Activitylog();
                    acitivitylog.activity = msg.body.file.originalname+" "+msg.body.file.type+" "+"deleted."
                    acitivitylog.date = getDate();
                    acitivitylog.userid = msg.body.userid;
                    acitivitylog.save();
                    callback(null, {
                        msg : msg.body.file.originalname+' folder deleted successfully.',
                        status : 'success'
                    });
                  });
                }
                else{
                    callback(null, {
                        msg : 'You are not authorise person to perform this task.',
                        status : 'error'
                    });
                }

        }
    }

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