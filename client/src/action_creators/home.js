import axios from 'axios';
import {URL} from '../constant';
//const headers = {
//    'Accept': 'application/json'
//};
export function INIT(){
    return  dispatch => {
        
       axios.get(URL+"user",{withCredentials: true})
          .then(function (response) {
              var userid = response.data.user._id;
              dispatch({ type : "HOME_RESULT", payload : response.data } )
              
               /*axios.post(URL+"home/root",{userid:response.data.user._id})
                .then(function (response) {
                   
                   dispatch({ type : "ROOT_RESULT", payload : response.data } )
                
                   axios.post(URL+"folder/load",{userid:userid,parentfolderid:response.data.rootid})
                   .then(function (response) {
                     return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
                   })
                   .catch(function (error) {
                     return dispatch({ type : "HOME_ERROR", payload : error } )
                   });
                })
                .catch(function (error) {
                  return dispatch({ type : "HOME_ERROR", payload : error } )
                });
                 
         
              */})
          .catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
         
    }/*
     fetch(URL+"home", {
      method: 'POST', 
      headers: {
        ...headers
      },
      credentials:'include'
    }).then(function (response) {
      //callback(response.data.status)
      console.log("res=>"+JSON.stringify(response))
      //return dispatch({ type : "HOME_RESULT", payload : response.data } )
    }).catch(function (error) {
      return dispatch({ type : "HOME_ERROR", payload : error } )
    });
}*/
}
export function LOGOUT(){
  return  dispatch => {
      
      axios.get(URL+"logout",{withCredentials: true})
        .then(function (response) {
          console.log("actions")
          return dispatch({ type : "LOGOUT", payload : response.data } )
         
        })
        .catch(function (error) {
          return dispatch({ type : "HOME_ERROR", payload : error } )
        });
       
   }
}


  export function LOAD(payload){
    return  dispatch => {
        
        axios.post(URL+"LOAD", payload)
          .then(function (response) {
            return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
         
     }
     
    }  
export function UploadFile(payload){
      return  dispatch => {
          
          axios.post(URL+"upload", payload)
            .then(function (response) {
              return dispatch({ type : "UPLOAD_RESULT", payload : response.data } )
            })
            .catch(function (error) {
              return dispatch({ type : "HOME_ERROR", payload : error } )
            });
           
       }
       
}
export function UploadFolder(parentfolderid,foldername,userid){
      if(foldername!=="")
      return  dispatch => {
         
          axios.post(URL+"upload/createfolder", {"parentfolderid":parentfolderid,"foldername":foldername,"userid":userid})
            .then(function (response) {
              return dispatch({ type : "CREARE_FOLDER_RESULT", payload : response.data } )
            })
            .catch(function (error) {
              return dispatch({ type : "CREARE_FOLDER_RESULT", payload : error } )
            });
           
       }
       else{
        return { type : "CREARE_FOLDER_ERROR", payload : {status:'error',msg:'folder name can not be blank.'} } 
         
       }
}
export function LOADFOLDER(userid,parentfolderid){
  return (dispatch) => {
    //sessionStorage.fname = folderid;
    axios.post(URL+"folder/load", {"userid":userid,"parentfolderid":parentfolderid}).then((response)=>{
              return dispatch({ type : "FOLDER_RESULT", payload : response.data } )
         
        }).catch(function (error) {
            return dispatch({ type : "HOME_ERROR", payload : error } )
          });
       
  }
}