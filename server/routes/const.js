var bcrypt = require('bcrypt');

 const salt = bcrypt.genSaltSync(10);
 function const(){
     return salt;
 }
 module.exports = {
    const:const
  }