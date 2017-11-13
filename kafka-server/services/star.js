var Content = require('../model/content');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    Content.findByIdAndUpdate({'_id':msg.body.contentid},
        { "$set" : { 'star': msg.body.value } },
        function (err, data) {
            if (err){ callback(null, { msg : 'System Error, Please try later.', status : 'error' }); }
           

            callback(null, {
                msg : 'Stared Successfully',
                status : 'success'
            });          
        }
    );
}
exports.handle_request = handle_request;