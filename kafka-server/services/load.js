var Content = require('../model/content');
var Mapping = require('../model/mapping');

function handle_request(msg, callback){
        console.log("parentfolderid"+msg.parentfolderid)
        Mapping.find({parentfolderid:msg.parentfolderid},{contentid:1,_id:0},function(err,mapping){
            if (err){
                callback(null, {
                    msg : 'System Error, Please try later.',
                    status : 'error'
                });
            }
            
                var contentid = mapping.map((data,i)=>data.contentid)
                Content.find({ '_id' :  contentid  }, function(err, content) {
                    callback(null, {
                        content:content,
                        msg : '',
                        status : 'success'
                    });
                })  
            
            
        })
          
        
    

        
     
}
exports.handle_request = handle_request;