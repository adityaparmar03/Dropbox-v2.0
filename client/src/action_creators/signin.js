import axios from 'axios';
import {URL} from '../constant';


const headers = {
  'Accept': 'application/json'
};
export function INIT(){
  return  dispatch => {
      
     axios.get(URL+"user",{withCredentials: true})
        .then(function (response) {
           
           return dispatch({ type : "SIGNIN_RESULT", payload : response.data } )
       
        })
        .catch(function (error) {
          return dispatch({ type : "SIGNIN_ERROR", payload : error } )
        });
       
  }
}
export function SignIn(data){
    return  dispatch => {
        
        /*axios.post(URL+"login", data)
          .then(function (response) {
            return dispatch({ type : "SIGNIN_RESULT", payload : response.data } )
          })
          .catch(function (error) {
            return dispatch({ type : "SIGNIN_ERROR", payload : error } )
          });*/
          
          fetch(URL+"login", {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(data)
        }).then(res => {
          if(res.status===201)
          return dispatch({ type : "SIGNIN_RESULT", payload : {status:"success",msg:"Account created successfully."} } )
          else
          return dispatch({ type : "SIGNIN_RESULT", payload : {status:"error",msg:"Username or Password may wrong."} } )
          
        })
            .catch(error => {
                console.log("This is error");
                
        })}}

