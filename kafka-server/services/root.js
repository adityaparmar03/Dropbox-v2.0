var Content = require('../model/content');

function handle_request(msg, callback){

   
   
    console.log("In Root handle request:"+ JSON.stringify(msg));
    Content.findOne({ 'userid' :  msg.userid , 'originalname':'root' }, function(err, data) {
        var res = {};
        if (err){
            callback(null, {
                msg : 'System Error, Please try later.',
                status : 'error'
            }); 
        }
         callback(null, {
                rootid:data.id,
                msg : 'get root successfully. ',
                status : 'success'
            });
        
        
    }
);



   
}

exports.handle_request = handle_request;