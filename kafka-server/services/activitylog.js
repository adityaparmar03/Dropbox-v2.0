var Activitylog = require('../model/acitivitylog');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    Activitylog.find({userid:msg.body.userid}, function(err, activities) {
                    
                        if (err){
                            callback(null, {
                                msg : 'System Error, Please try later.',
                                status : 'error'
                            });
                        }
                        callback(null, {
                            activities:activities
                        });

    })
}
exports.handle_request = handle_request;