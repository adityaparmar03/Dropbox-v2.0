import axios from 'axios';
import {URL} from '../constant';


const headers = {
  'Accept': 'application/json'
};
export function INIT(){
  return  dispatch => {
      
     axios.get(URL+"user",{withCredentials: true})
        .then(function (response) {
           
            if(response.data.status == "success"){
              axios.post(URL+"home/root",{userid:response.data.user._id})
              .then(function (response) {
  
                return dispatch({ type : "ROOT_RESULT", payload : response.data } )
  
              })
              .catch(function (error) {
                return dispatch({ type : "SIGNIN_ERROR", payload : error } )
              });
            }else{

            }
            

       
        })
        .catch(function (error) {
          return dispatch({ type : "SIGNIN_ERROR", payload : error } )
        });
       
  }
}
export function SignIn(data){
    return  dispatch => {

          fetch(URL+"login", {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(data)
        }).then(response => { return response.json(); })
        .then(function(data) {
          dispatch({ type : "SIGNIN_RESULT", payload : data } )
        }).catch(error => {
                console.log("This is error");
                
        })}}

