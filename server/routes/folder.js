var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/load', function (req, res, next) {
    console.log(req.body.parentfolderid)
    kafka.make_request('loadfolder_topic',{
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
                    currentfolderid:results.currentfolderid,
                    status:results.status,
                    msg:results.msg
                })
           
            }
        
    });
})  


module.exports = router;