var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var kafka = require('../kafka/client');
var date = require('./date');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
});

var upload = multer({storage:storage}).single('myfile');

router.post('/', upload, function (req, res, next) {
   
    kafka.make_request('uploadfile_topic',{
        "originalname":req.file.originalname,
        "virtualname":req.file.filename,
        "type":"file",
        "date":getDate(),
        "star":"no",
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
})  
router.post('/createfolder', function (req, res, next) {

    kafka.make_request('createfolder_topic',{
        "foldername":req.body.foldername,
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
}) 
function getDate(){
    
        function twoDigits(d) {
            if(0 <= d && d < 10) return "0" + d.toString();
            if(-10 < d && d < 0) return "-0" + (-1*d).toString();
            return d.toString();
        }
        
        Date.prototype.toMysqlFormat = function() {
            return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
         
        var date = Date().toString();
        return date;
}

module.exports = router;