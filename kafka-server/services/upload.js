var Content = require('../model/content');
var Mapping = require('../model/mapping');
var Activitylog = require('../model/acitivitylog');

function handle_request(msg, callback){
    console.log("I m calling"+msg)
    var content = new Content();
    content.originalname = msg.originalname;
    content.virtualname = msg.virtualname;
    content.date = msg.date;
    content.star = msg.star;
    content.type = msg.type;
    content.userid = msg.userid;
    console.log("contnt:"+JSON.stringify(content))
    content.save(function(err,content) {
        if (err){
            callback(null, {
                msg : 'System Error, Please try later.',
                status : 'error'
            });
        }
        var mapping = new Mapping();
        var contentid = content.id
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
                    acitivitylog.activity = content.originalname+" "+content.type+" "+"uploaded."
                    acitivitylog.date = content.date;
                    acitivitylog.userid = content.userid;
                    acitivitylog.save();

                    callback(null, {
                        content:content,
                        msg : 'File successfully uploaded.',
                        status : 'success'
                    });
                })  
            });

        
        
    });

        
     
}
exports.handle_request = handle_request;