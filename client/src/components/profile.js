import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/profile';
import { withRouter } from 'react-router-dom'
import Menu from './menu'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            email:"",
            password:"",
            firstname:"",
            lastname:"",
            aboutme:"",
            interests:"",
            status:"",
            msg:"",
            userid:"",
            isPasswordchanged:"NO"
        }
    }
    updateState(name, value){
           
            
           
                if(name==="password"){
                    this.setState({password : value});
                    this.setState({isPasswordchanged:"YES"})
                }
               

                if(name==="firstname")
                this.setState({firstname : value});
                if(name==="lastname")
                this.setState({lastname : value});
                if(name==="aboutme")
                this.setState({aboutme : value});
                if(name==="interests")
                this.setState({interests : value});
                
            
         
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
          this.setState({
            email:nextProps.profile.email,
            password:nextProps.profile.password,
            firstname:nextProps.profile.firstname,
            lastname:nextProps.profile.lastname,
            aboutme:nextProps.profile.aboutme,
            interests:nextProps.profile.interests,
            status:nextProps.profile.status,
            msg:nextProps.profile.msg,
            userid:nextProps.profile.userid,
          
          })
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("aditya-token");
        
        if(localStorage.getItem("aditya-token")===null)
        {
            this.props.history.push('/signin');
        }
        else{

          this.props.INIT(token);
                             
        }
      }
    
      errordisplay(){
        if(this.state.msg!=="token verified successfully"){
            if(this.state.status==="success"){
                return (<div className="alert alert-success alert-dismissable fade in">
                <a  className="close" data-dismiss="alert" aria-label="close">&times;</a>
                {this.state.msg} </div>)
            }else{
                return (<div className="alert alert-danger alert-dismissable fade in">
                <a className="close" data-dismiss="alert" aria-label="close">&times;</a>
                {this.state.msg} </div>)
            }
        }else{
            <div></div>
        } 
    }
    
    render() {
        return (
           
            <div className="container-fluid">  
                <div className="row">
                   
                    <div className="col-6 col-md-2">
                       <Menu/>
                </div>
                <div className="col-6 col-md-8">
                {this.errordisplay()}
                    <div style={{paddingTop:"5%"}}> 
                        <h5><b>Personal Account</b></h5>
                        <hr/>
                        <div style={{height:"600px",overflow:"scroll"}}>

                        <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" 
                        value={this.state.email} id="email" disabled/>
                        </div>

                         <div className="form-group">
                        <label  htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" 
                        value={this.state.password} id="pwd"
                        onChange={(e)=>this.updateState("password",e.target.value)} disabled/>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="fn">First Name:</label>
                        <input type="text" className="form-control"
                        value={this.state.firstname} id="fn"
                        onChange={(e)=>this.updateState("firstname",e.target.value)}/>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="ls">Last Name:</label>
                        <input type="text" className="form-control"
                        value={this.state.lastname} id="ls" 
                        onChange={(e)=>this.updateState("lastname",e.target.value)}/>
                        </div>
                        
                        <div className="form-group">
                        <label  htmlFor="about">About me:</label>
                        <textarea type="text" className="form-control" 
                        value={this.state.aboutme } id="about" 
                        onChange={(e)=>this.updateState("aboutme",e.target.value)}></textarea>
                        </div>

                        <div className="form-group">
                        <label  htmlFor="int">My Interests:</label>
                        <textarea type="text" className="form-control" 
                        value={this.state.interests} id="int" 
                        onChange={(e)=>this.updateState("interests",e.target.value)}></textarea>
                        </div>

                        {console.log(JSON.stringify(this.state))} 
                        <button type="submit" className="btn btn-primary"
                        onClick={()=>this.props.UPDATE(this.state.email,
                            this.state.password,
                            this.state.firstname,
                            this.state.lastname,
                            this.state.aboutme,
                            this.state.interests,
                            this.state.userid,
                            this.state.isPasswordChanged
                        )}>Save</button>
                      
                        </div>
                        
                    </div>    
                </div>
                <div className="col-6 col-md-2">
                         
               
          
                    <button className="btn btn-link" onClick={()=>{this.props.LOGOUT();this.props.history.push('/signin');}}>logout </button>
                   
               
                    </div>
            </div>
            </div>
                
               
        );
    }
}
function mapStateToProps(state){
    
     return{
        
         profile : state.profile
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Profile));