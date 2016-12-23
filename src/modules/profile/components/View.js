import React from 'react';
import { Link, browserHistory } from 'react-router';
import {localUser, toast} from './../../utils/functionals';
import { If, ElseIf } from './../../utils/components';
import { getUser, editUser, resetPassword} from './../services';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
  getInitialState() {
    return {
      data: [],
      changePassword:false,
      mismatch:false,
      confirm_password:'',
      oldPassword:''
    }
  },
  componentWillMount() {
    var user=localUser.get();
    var that = this;
    getUser({suserid:user.info._id},function(err,res) {
      that.setState({
        data:res.data
      });
    });
  },
  input(event,key){
    var data=this.state.data;
    var value=event.target.value;
    data[key]=value;
    this.setState({
      data
    })
  },
  confirmPassword(e){
    this.setState({
      confirm_password: e.target.value
    })
  },
  matchPassword(){
    var password=this.state.data.password;
    var confirmPassword=this.state.confirm_password;
    if(password!=confirmPassword){
      this.setState({
        mismatch:true
      });
    }
    if(password==confirmPassword){
      this.setState({
        mismatch:false
      });
    }
  },
  oldPassword(e){
    this.setState({
      oldPassword:e.target.value
    });
  },
  updateProfle(){
    var that=this;
    var user=localUser.get();
    var suserid=user.info._id;
    var data=JSON.parse(JSON.stringify(that.state.data))
    delete data._id;
    editUser({data,suserid}, (err, res) => {
      if (res.status==1){
        toast.show(Toast.saved);
        browserHistory.push('/profile');
      }
      if (err || res.status<1) {
        toast.show(Toast.error);
      }   
    })
  },
  changePassword(){
    this.setState({
      changePassword:true
    })
  }, 
  updatePassword(){
    var that=this;
    var old_pass=that.state.oldPassword;
    var new_pass=that.state.data.password;
    resetPassword({old_pass,new_pass}, (err, res) => {
      if (res.status==1){
        toast.show(Toast.reset);
        browserHistory.push('/dashboard');
      }
      else if (res.status==-1){
        toast.show(Toast.old_mismatch);
      }
      if (err) {
        toast.show(Toast.error);
      }  
   })
  },
  closePasswordPopup(){
    this.setState({
      changePassword:false,
      edit:false
    }) 
  },
  render() {
    var component = this;
    return (     
      <div className="col l12">
        <If test={!this.state.changePassword}>
          <div> 
            <div className="col l12"><br/></div>
            <h4 className="col l12 blue-text text-darken-2">View Profile</h4>
            <div className="col l12"><br/> <br/></div>
            <div className="row">
              <div className="col l6">
                <div className="userCoverPic"><img src={this.state.data.cover_photo} /></div>
              </div>
              <div className="col l6">
                <div className="userProfilePic"><img src={this.state.data.profile_pic} /></div>
              </div>
            </div>
            <InputRow component={component} edit={component.state.edit} list={[{_key:'cover_photo',label:'Cover Photo'},{_key:'profile_pic',label:'Profile Picture'}]} />
            <InputRow component={component} edit={component.state.edit} list={[{_key:'first_name',label:'First Name'},{_key:'last_name',label:'Last Name'}]} />
            <InputRow component={component} edit={component.state.edit} list={[{_key:'email',label:'Email'},{_key:'designation',label:'Designation'}]} />
            <InputRow component={component} edit={component.state.edit} list={[{_key:'twitter_handle',label:'Twitter Handle'},{_key:'facebook_username',label:'Facebook Profile'}]} />
            <InputRow component={component} edit={component.state.edit} list={[{_key:'display_name',label:'Display Name'},{_key:'username',label:'Username',disabled:!component.state.create}]} />
            <div className="row">
              <div className=" col l6">
                <div className="active">About Me</div>
                <div className="blue-text text-darken-1" >{this.state.data.about_me}</div>
              </div>
            </div>
            <div className="card-action primary-background white-text">
              <Link className="btn" to={'/profile/edit/'+ component.state.data.username }>Edit
                <i className="material-icons right">send</i>
              </Link>
              <button className="btn" type="submit" onClick={ this.changePassword }>Change Password
                <i className="material-icons right">send</i>
              </button>
              <Link className="btn" to=''>Cancel</Link>   
            </div>             
          </div>
        </If>
        <If test={this.state.changePassword}>    
          <div className="col l6">
            <div className="col l12"><br/></div>
            <h4 className="col l12 blue-text text-darken-2">Update Password</h4>
            <div className="col l12"><br/> <br/></div>
            <div className="row">
              <div className="input-field row col l6">
                  <input type="text" onChange={this.oldPassword} id="oldPassword" />
                  <label className="active" htmlFor="oldPassword">Old Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col l6">
                <input type="text" onChange={(event)=> this.input(event,'password')} id="changePassword" />
                <label className="active" htmlFor="changePassword">Password</label>
              </div>
              <div className="input-field col l6">
                <input type="password" onChange={this.confirmPassword} onBlur={this.matchPassword} id="Retype"/>
                <label className="active" htmlFor="Retype">Retype Password</label>
                  {
                    this.state.mismatch==true?<h5 className="col l12 red-text text-darken-1">* Password Mismatch</h5>:null
                  }
               </div>
            </div>
            <div className="input-field col l6">
              <div className="btn" onClick={component.updatePassword}>Update</div>
              <Link className="btn" to='/profile' onClick={component.closePasswordPopup}>Back To Profile</Link>
            </div>
          </div>
        </If> 
      </div>
    )
  }
});

var InputBox= function (props) {
  var component=props.component;
  if(!component) return null;
    return (
      <div className=" col l6">
        <div className="active">{props.placeholder}</div>
        <div className="blue-text text-darken-1" id={props._key}>{component.state.data[props._key]}</div>
      </div>
  );
}
var InputRow=function(props){
  var List = props.list.map((item,i)=>
      <InputBox key={i} type={item.type || null } component={props.component} edit={props.edit} placeholder={item.label} _key={item._key} disabled={item.disabled || false}/>
  );
  return (<div className="row">{List}</div>)
}
