var express = require('express');
var router = express.Router();
var flash    = require('connect-flash');

module.exports = function(passport){

	router.post('/login', (req, res, next) => {
     passport.authenticate('login', (err, user) => {
          if (err) {
            if (err.name === 'IncorrectCredentialsError') {
              return res.json({
                status : "error",
                msg: err.message
              });
            }
               return res.json({
                status : "error",
                msg: 'Could not process the form.'
            });
          }
          var userid = user._id;
          req.logIn(user, function(err,user) {
            if (err) { return next(err); }
           
            return res.json({
              userid : userid,
              status : "success",
              msg:"Successfully Logged In."
            })

          });  
          
        })(req, res, next);
      });

	/* GET Home Page */
	router.get('/user', function(req, res){
        if(req.isAuthenticated()){
             res.json({ 
                user: req.user,
                status: "success",
                msg:"Welcome to Dropbox."
             });
        }else{
            console.log("err")
            res.json({ 
                status: "error",
                msg:"Please Log In again",
                user:""
             });
        }
        
       
	});

	/* Handle Logout */
	router.get('/logout', function(req, res) {
    console.log("I am Logout")
    //req.session.distory();
    req.logout(); 
    
    res.json({ 
            status: "logout",
            msg:"Please Log In again",
           
         });

    
});
	return router;
}
