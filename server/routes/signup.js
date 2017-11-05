var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var kafka = require('../kafka/client');



router.get('/', function(req, res, next) {
  
    res.send("I am home");

});
router.post('/', function(req, res, next) {
   
    kafka.make_request('signup_topic',{
        "email":req.body.email,
        "password":req.body.password,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
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
                    msg:results.msg
                })
           
            }
        
    });

    
 
})

module.exports = router;
