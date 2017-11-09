var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');


router.get('/', function(req, res, next) {
  
    res.send("I am home");

});

router.post('/load', function(req, res) {

	kafka.make_request('test2',{
        "userid":req.body.userid,
        "parentfolderid":req.body.parentfolderid
        }, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res.json({
                status:"error",
                msg:"Sytem Error, Try Again."
            })
        }else{
    
                res.json({
                    content:results.content,
                    status:results.status,
                    msg:results.msg
                })
           
            }
        
    });
	
});
router.post('/root', function(req, res) {
console.log("root-userid:"+req.body.userid)
   kafka.make_request('root_topic',{
        "userid":req.body.userid,
        }, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res.json({
                status:"error",
                msg:"Sytem Error, Try Again."
            })
        }else{
    
            res.json({
                status:results.status,
                msg:results.msg,
                rootid : results.rootid
            })
           
            }
        
    }); 
      
  });
  
module.exports = router;
