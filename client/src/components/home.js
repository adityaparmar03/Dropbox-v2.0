import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/home';
 
import { withRouter } from 'react-router-dom'
import Menu from './menu'
import  '../css/uploadfile.css'
//import '../css/table.css'
const queryString = require('query-string');

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
           firstname:"",
           lastname:"",
           email:"",
           status:"",
           msg:"",
           userid:"",
           files:[],
           foldertrack:[],
           currentfolderid:"",
           publicsharinglink:"",
           sharedcontentid:""
        }
     }
  
    componentDidMount() {
        this.props.INIT()
       
        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.home) {
          if(nextProps.home.status === 'error'){
                this.props.history.push('/signin');
          }
          else if(nextProps.home.status === 'logout'){
                this.props.history.push('/signin');
          }
          else{
            this.setState({
                email:nextProps.home.email,
                firstname:nextProps.home.firstname,
                lastname:nextProps.home.lastname,
                files:nextProps.home.files.reverse(),
                userid:nextProps.home.userid,
                currentfolderid:nextProps.home.currentfolderid
              
              })
          }  
         
        }
    }
    share(file){

        var link="http://localhost:9000/files/"+file.virtualname 
        this.setState({publicsharinglink:link})
        this.setState({sharedcontentid:file.contentid})
 
 
     }
    handleFileUpload = (event) => {
        
               
                    const payload = new FormData();
                    payload.append('myfile', event.target.files[0]);
                    payload.append('userid',this.state.userid);
                    payload.append('parentfolderid',this.state.currentfolderid);
                    this.props.UploadFile(payload);
                    event.target.value = null;
               

        
    };
    
    star(isstar,contentid)
    {
        if(isstar==="YES"){
            return <img onClick={()=>this.props.dostar(contentid,"NO",this.state.currentfolderid,this.state.userid)} src={require('../images/bluestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
        }
        else{
            return <img onClick={()=>this.props.dostar(contentid,"YES",this.state.currentfolderid,this.state.userid)} src={require('../images/whitestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
            
        }
    }

    getData(folder,type){
      this.props.history.push('/?f='+folder._id)
    }
    display(file,i){
      
        if(file.type==="file")
        {
            this.check =1;
            var star = file.star;
         

        return (<tr key={file._id}>
            <td style={{width:"50%"}}>

            <img src={require('../images/file.png')} alt="" style={{width:"50px",height:"50px"}}/>    
            <a  href={"http://localhost:9000/files/"+file.virtualname} target="_blank">{file.originalname}</a>
            {this.star(file.star,file.contentid)}
            </td>
            <td>
            <p>{(file.date).substring(0,25)}</p>    
            </td>
            <td>
            <p>Only you</p>    
            </td>
            <td>
            <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
             data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
            <ul className="dropdown-menu" role="menu">
                
                <li role="presentation">
                <a href={"http://localhost:9000/files/"+file.virtualname} download>Download</a></li>
                <li><a data-toggle="modal" data-target="#fileModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a onClick={()=>this.props.deleteContent(this.state.currentfolderid,
                    file._id,this.state.userid )}>Delete</a></li>
            </ul>
            </td>     
            </tr>
            )
        }
        else if(file.type==="folder"){
            this.check =1;
        
        return ( <tr key={file.contentid}>
            <td  style={{width:"50%"}}>
            
            <img src={require('../images/folder.png')} alt="" style={{width:"50px",height:"50px"}}/>        
            <button className="btn btn-link"  onClick={()=>this.getData(file,"add")}>{file.originalname}</button> 
            {this.star(file.star,file.contentid)}
            </td>
            <td>
            <p>{(file.date).substring(0,25)}</p>    
            </td>
            <td>
            <p>Only you</p>    
            </td>
            <td>
            <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
             data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                
                <li><a data-toggle="modal" data-target="#folderModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a onClick={()=>this.props.deleteContent(this.state.currentfolderid,
                    file.contentid,this.state.userid )}>Delete</a></li>
            
         
            </ul>
            </td> 
            </tr>)
        }
        else{
           console.log("elsepart"+check) 
           if(this.check===0){
            return (<tr key={i}>
                <td>
                <b>NO CONTENT</b>
                </td>
               
                </tr>  )
           }
             
        }
        
        
    }
    
    LOADFOLDER(){
        
         let query = queryString.parse(window.location.search);
        
         if(query.f!=this.state.currentfolderid){
            this.props.LOADFOLDER(this.state.userid,query.f)
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
               
                
                    <div style={{marginTop:"5%"}}>
                        <h4>Dropbox</h4>
                    </div>
                    <div>
                        {this.state.foldertrack.map((item,i)=>
                        <div style={{display:"inline"}}>
                        <button className="btn btn-link" onClick={()=>this.getData(item,"remove")}>{item.originalname}
                        </button>></div>)}
                    </div>    
                    <div>
                    <table className="table">
                    <thead>
                     <tr>
                         
                            <th  style={{width:"50%"}}>Name</th>
                            <th>Date</th>
                            <th>Member</th>
                            <th></th>
                    </tr>
                    </thead>
                    <tbody>
                      {    this.LOADFOLDER() }
                      {
                     
                         this.state.files.map((this.display),this)
                          
                      }
                    </tbody>  
                     </table>
                </div>
                </div>
                
                <div className="col-6 col-md-2">
                    Hello, {this.state.firstname}
                    <button className="btn btn-link" onClick={()=>{this.props.LOGOUT()}}>logout </button>
                    <br/>
                    <div style={{marginTop:"40%"}}>
                    <div className="upload-filebtn-wrapper">
                    <button className="btn btn-primary" style={{width:"150px"}} >Upload a file</button>
                    <input type="file" name="myfile" onChange={this.handleFileUpload}/>
                    </div>
                    <br/><br/>
                    <input type="text" className="form-control" ref = "foldername" 
                    id="newfoldername" placeholder="Folder Name" style={{width:"150px"}}/>
                    <br/>
                    <button className="btn btn-primary" style={{width:"150px"}}
                    onClick={()=>this.props.UploadFolder(this.state.currentfolderid,
                    this.refs.foldername.value,this.state.userid)}>Create</button>
                    
                    </div>
                    <div style={{marginTop:"40%"}}>
                        <p>Email:{this.state.email}</p>
                        <p>Firstname:{this.state.firstname}</p>
                        <p>Lastname:{this.state.lastname}</p>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="fileModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                    <p>Public Link:<input className="form-control" value={this.state.publicsharinglink}/></p>
                    <hr/>
                    <input placeholder="Email" className="form-control" ref="fileemailid"/><br/>
                    <button className="btn btn-primary"  onClick={()=>this.props.shareByEmail( this.refs.fileemailid.value,this.state.userid,this.state.sharedcontentid)}>Share</button>
                  
                    </div>
                    
                   
                    <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
      
                </div>
            </div>
            <div className="modal fade" id="folderModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                    
                    <input placeholder="Email"  className="form-control"
                    ref="folderemailid" /><br/>
                    <button className="btn btn-primary"
                    onClick={()=>this.props.shareByEmail(this.refs.folderemailid.value,this.state.userid,this.state.sharedcontentid)}>Share</button>
                    </div>
                    
                    
                   
                    <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
      
                </div>
            </div>
                  
          </div>
        );
    }
}


function mapStateToProps(state){
    
     return{
        
         home : state.home
     }
 }
 function matchDispatchToProps(dispatch){
     
     return bindActionCreators(myactions,dispatch)
   
     
 }
 
 
 export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Home));