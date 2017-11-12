var express = require('express');
var router = express.Router();

var kafka = require('../kafka/client');



router.post('/', function(req, res, next) {
   
     kafka.make_request('activitylog_topic',{
         "body":req.body,
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

                    activities:results.activities
                     
                 })
            
             }
         
     });
 
     
  
 })
 module.exports = router;