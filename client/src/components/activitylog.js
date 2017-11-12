import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/activitylog';
import { withRouter } from 'react-router-dom'
import Menu from './menu'
import '../css/table.css'

class Activitylog extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            activity:[]
        }
    }
   
    componentWillReceiveProps(nextProps) {
        if (nextProps.activitylog) {
           
          this.setState({
           

            activity:nextProps.activitylog.activity
           
          
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
    
      display(activity,i){
      
        return (<tr key={i}>
                    
                    <td style={{width:"50%"}}>
                        {activity.msg}
                    </td>   
                    <td>
                        {activity.date.substring(0,25)}
                    </td>  
                </tr>
            )
        }
      
        
    
    render() {
        return (
           
            <div className="container-fluid">  
                <div className="row">
                    <div className="col-6 col-md-2">
                       <Menu/>
                    </div>
                    <div className="col-6 col-md-8">
                      <div style={{paddingTop:"5%"}}> 
                         <h5><b>Activity Report </b></h5>
                         <hr/>
                         <table className="table">
                         <thead>
                          <tr>
                              
                                 <th  style={{width:"50%"}}>Activity</th>
                                 <th>Date</th>
                                 
                          </tr>
                         </thead>
                         <tbody>
                            {
                         
                             this.state.activity.map((this.display),this)
                                
                            }
                        </tbody>
                            </table>
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
        
        activitylog : state.activitylog
        
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Activitylog));