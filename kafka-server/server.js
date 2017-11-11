var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var upload = require('./services/upload');

var root = require('./services/root');
var createfolder = require('./services/createfolder');
var loadfolder = require('./services/loadfolder');
var users = require('./services/users');
var share = require('./services/share')
//database connection
var mongoose = require('mongoose');
mongoose.connect(("mongodb://localhost:27017/Dropbox"), { useMongoClient: 
true });
var db = mongoose.connection;

//
function test(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
}
// LOGIC TOPIC
test("login_topic",login)
test("signup_topic",signup)
test("uploadfile_topic",upload)

test("root_topic",root)
test("createfolder_topic",createfolder)
test("loadfolder_topic",loadfolder)
test("loadusers_topic",users)
test("share_topic",share)