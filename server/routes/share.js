var express = require('express');
var router = express.Router();
var User = require('../models/user');
var kafka = require('../kafka/client');



router.post('/', function(req, res, next) {
   
     kafka.make_request('share_topic',{
         "users":req.body.users,
         "contentid" : req.body.contentid,
         "sender_userid" : req.body.userid
         }, function(err,results){
         console.log('in result');
         console.log(results);
         if (err){
             res.json({
                 status:"error",
                 msg:"System Error, Try Again."
             })
         }else{
     
                 res.json({
                    msg : results.msg,
                    status : results.status
                 })
            
             }
         
     });
 
     
  
 })
 module.exports = router;