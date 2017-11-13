//call inbuilt modules

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var flash    = require('connect-flash');

// call express
var app = express();
// add cors 

var cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   } else {
       next();
   }
  });*/
/*var mongodb = require('./routes/mongo')
mongodb.establishConnection(function(connection){
   connection.createCollection("userdata", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
 });*/
 var mongoose = require('mongoose');
 mongoose.connect(("mongodb://localhost:27017/Dropbox"), { useMongoClient: 
 true });
 var db = mongoose.connection;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('./public/files', express.static(path.join(__dirname, 'files')));

app.use(session({ 
  secret: 'Aditya',
  resave:true,
  saveUninitialized:true,
  store   : new MongoStore({
    mongooseConnection: db
  }) 
})); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// manage routes 
//call all routes
//var home = require('./routes/home');

//app.use('/signin', signin);
//app.use('/signup', signup);
//app.use('/', home);


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var index = require('./routes/index')(passport);
app.use('/', index);

var signup = require('./routes/signup')
app.use('/signup',signup);

var upload = require('./routes/upload')
app.use('/upload',upload);

var home = require('./routes/home')
app.use('/home',home);

var folder = require('./routes/folder')
app.use('/folder',folder);

var users = require('./routes/users')
app.use('/users',users);

var share = require('./routes/share')
app.use('/share',share);

var profile = require('./routes/profile')
app.use('/profile',profile);

var deletecontent = require('./routes/delete')
app.use('/delete',deletecontent);

var activitylog = require('./routes/activitylog')
app.use('/activitylog',activitylog);

var star = require('./routes/star')
app.use('/star',star);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

module.exports = app;
