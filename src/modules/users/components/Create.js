import React from 'react';
import { Link, browserHistory } from 'react-router';
import { createUser, updateUser, sendEmail } from './../services';
import { default as defaultData } from './../stub/defaultData';
import { toast } from './../../utils/functionals';
import { If } from './../../utils/components';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
  getInitialState() {
    return {
      form: this.props.data || defaultData,
      permission:this.props.permission,
      usergroups:this.props.usergroups,
      mismatch:false,
      confirm_password:'',
      uniqueUser:'',
      create:this.props.data ? false : true,
      sendEmail:false,
      changePassword:false
    }
  },
  componentWillReceiveProps(props){
    var that=this;
    var data=props.data || defaultData;
    if(!data.groups) data.groups=[];
    this.setState({
      form: data ,
      create:props.data ? false : true,
      usergroups:props.usergroups,
      permission:props.permission
    })
  }, 
  input(event,key){
    var form=this.state.form;
    var value=event.target.value;
    form[key]=value;
    switch(key){
      case 'display_name':{
        if(this.state.create){
          value=value.toLowerCase().trim().replace(/\s+/g, '-');
          form['author_url']=value;
          form['username']=value;
        } 
      }
    }
    this.setState({
      form
    })
  },
  getLatestDate(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
      return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  },
  inputDisplayName(event,key){
    this.inputUsername(this.state.uniqueUser,'username');
    this.inputUserUrl(this.state.uniqueUser,'author_url');
  },
  confirmPassword(e){
    this.setState({
      confirm_password: e.target.value
    })
  },
  matchPassword(){
    var password=this.state.form.password;
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
  permissionChanged(event,key){
    var that=this;
    var form=that.state.form;
    form[key]=event.target.id;
    that.setState({
      form
    });
  },
  toggleChange(event,key){
    var that=this;
    var newArray = [];
    // var checkValues=[]
    // checkValues.push(event.target.id);
    // for (var i=0; i<checkValues.length; i++) {
    //  if (checkValues[i].checked) {
    //     newArray.push(checkboxes[i].id);
    //   }
    // }
    // if(event.target.checked){
    //   checkValue=event.target.id
    // }
    // console.log(checkValues);

    var checkboxes = document.getElementsByName('userGrp');
    for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        newArray.push(checkboxes[i].id);
      }
    }
    
    var form=that.state.form;
    form[key]=newArray;
    form['user_registered']=this.getLatestDate();
    that.setState({
      form
    });  
  },
  create(){
    var that=this;
    if(this.state.form.display_name=='' || this.state.form.email=='' || this.state.form.password==''){
      toast.show(Toast.missingFields);
    }else{ 
      var form=that.state.form;
      form['user_registered']=this.getLatestDate();
      createUser({data:form}, (err, res) => {
        if(res.status==0 || err){
          toast.show(Toast.error);
        }
        if (res.status==1){
          toast.show(Toast.created);
          this.setState({
            sendEmail:true
          })
        }else if(res.status==-1){
          toast.show(Toast.duplicateUsername);
        }
      }) 
    }
  },
  save(){
    var that=this;
    var data=JSON.parse(JSON.stringify(this.state.form))
    var suserid=data._id;
    delete data._id;
    updateUser({data,suserid}, (err, res) => {
      if(res.status==0 || err){
        toast.show(Toast.error);
      }
      if (res.status==1){
        toast.show(Toast.saved);
        browserHistory.push('/users');
      }
    }) 
  },
  userEmailSend(){
    var that=this;
    var formData = {
      "from_" : "cms@scoopwhoop.com",
      "to_" : "ankit@scoopwhoop.com",
      "subject_" : 'Mail from CMS',
      "message_" : 'Your CMS account has been created. Following are the credentials.... Username: "' + that.state.form.username + '". Password: "' + that.state.form.password + '".'
    };
    sendEmail(formData, (err, res) => {
      if (res.status==1){
        toast.show(Toast.mailSent);
        browserHistory.push('/users');
      }  
      if (res.status==0 || err) {
        toast.show(Toast.error)
      }   
    }) 
  },
  changePassword(){
    this.setState({
      changePassword:true
    })
  },
  closePasswordPopup(){
    this.setState({
      changePassword:false
    }) 
  },
  render() {
    var component=this;
    return (
      <div className="card layout-one-card">
        <If test={!this.state.sendEmail}>
          <div className="col l12">
            <div className="card-title">
              <If test={this.state.create}><div>Create User</div></If>
              <If test={!this.state.create}><div>Edit User</div></If> 
            </div>
            <div className={(this.state.saving ? 'saving ':'') + 'card-content' }>
              <div className="row">
                <div className="col l6">
                  <div className="userCoverPic"><img src={this.state.form.cover_photo} /></div>
                </div>
                <div className="col l6">
                  <div className="userProfilePic"><img src={this.state.form.profile_pic} /></div>
                </div>
              </div>
              <InputRow component={component} edit={component.state.edit} list={[{_key:'cover_photo',label:'Cover Photo'},{_key:'profile_pic',label:'Profile Picture'}]} />
              <InputRow component={component} edit={component.state.edit} list={[{_key:'first_name',label:'First Name'},{_key:'last_name',label:'Last Name'}]} />
              <InputRow component={component} edit={component.state.edit} list={[{_key:'email',label:'Email'},{_key:'designation',label:'Designation'}]} />
              <InputRow component={component} edit={component.state.edit} list={[{_key:'twitter_handle',label:'Twitter Handle'},{_key:'facebook_username',label:'Facebook Profile'}]} />
              <InputRow component={component} edit={component.state.edit} list={[{_key:'display_name',label:'Display Name'},{_key:'username',label:'Username',disabled:!component.state.create}]} />
              <If test={this.state.create}>
                <div className="row">
                  <InputBox type='password' component={component} placeholder={'Password'} _key={'password'}/>
                  <div className="input-field col l6">
                    <input type="password" onChange={this.confirmPassword} onBlur={this.matchPassword} className="validate" id="Retype"/>
                    <label className="active" htmlFor="Retype">Retype Password</label>
                        {
                          this.state.mismatch==true?<h5 className="col l12 red-text text-darken-1">* Password Mismatch</h5>:null
                        }
                  </div>
                </div>
              </If>
              <div className="row">
                <div className="input-field col l12">
                <textarea className="materialize-textarea" value={this.state.form.about_me} onChange={(event)=> this.input(event,'about_me')} id="aboutUser" />
                
                <label className="active" htmlFor="aboutUser">About me</label>
                 </div>
              </div>
              <Permissions component={component} permissions={component.state.permission} edit={component.state.edit} />
              <UserGroups component={component} usergroups={component.state.usergroups} edit={component.state.edit} />
              <div className="card-action primary-background white-text">
                <If test={this.state.create}>
                  <button className="btn" type="submit" onClick={this.create}>Create
                    <i className="material-icons right">send</i>
                  </button>
                </If>
                <If test={!this.state.create}>
                   <button className="btn" type="submit" onClick={this.save}>Save
                    <i className="material-icons right">send</i>
                  </button>
                </If>
              </div>          
            </div>
          </div>
        </If>
        <If test={this.state.sendEmail}>    
          <div className="col l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Successfully created the user - {component.state.form.username}</span>
                <p><br/> <br/></p>
                <p><span>User  name - </span><span>{component.state.form.username}</span> </p>
                <p><span>User Email - </span><span>{component.state.form.email}</span> </p>
                <p><span>User Password - </span><span>{component.state.form.password}</span> </p>
              </div>
              <div className="card-action">
                <button className="btn" type="submit" onClick={this.userEmailSend}>Email User Details</button>
              </div>
            </div>
          </div>
        </If>  
      </div>
    )
  }
});
var InputBox= function(props){
  var component=props.component;
  if(!component) return null;
    return (
      <div className="input-field col l6">
        <input className="validate" id={props._key} disabled={props.disabled} type={props.type || 'text'}  value={component.state.form[props._key]} onChange={(e)=> component.input(e,props._key)} />
        <label className="active" htmlFor={props._key}>{props.placeholder}</label>
      </div>    
  );
}
var InputRow=function(props){
  var List = props.list.map((item)=>
    <InputBox key={item._key} type={item.type || null } component={props.component} edit={props.edit} placeholder={item.label} _key={item._key} disabled={item.disabled || false}/>
    );
  return (<div className="row">{List}</div>)
}
var UserGroups=function(props){
  if(!props.usergroups) props.usergroups=[];
  var List= props.usergroups.map(function(item, i){
    var selected=(props.component.state.form.groups.indexOf(item._id)>-1);
    return (
      <div  className={(selected ? 'selected ':'') + 'permissionsValue col s4'} key={i} >
        <div className="card">
          <div className="card-content">
            <span>{item.groupname}</span>
            <div className="input-field">
              <input type="checkbox" name="userGrp" className="filled-in" value={item.groupname} id={item._id} checked={selected} onChange={(event)=> props.component.toggleChange(event,'groups')}/>
              <label htmlFor={item._id}></label>
            </div>
          </div>
        </div>
      </div>
    )           
  })
  return(
    <div className="row">
      <h5 className="col l12 blue-text text-darken-1">Groups</h5>
      { List }
    </div>
  )             
}
var Permissions=function(props){
  if(!props.permissions) props.permissions=[];
  var List= props.permissions.map(function(item, i){
    var selected=(props.component.state.form.perm == item._id);
    return (
      <div className={(selected ? 'selected ':'') + 'permissionsValue col s4'} key={i} >
        <div className="card">
          <div className="card-content">
            <span>{item.permname}</span>
            <div className="input-field">
              <input name="perm" type="radio" value={item.permname} checked={selected} id={item._id} onChange={(event)=> props.component.permissionChanged(event,'perm')}/>
              <label htmlFor={item._id}></label>
            </div>
          </div>
        </div>
      </div>     
    )                                       
  });
  return(
    <div className="row">
      <h5 className="col l12 blue-text text-darken-1">Permissions</h5>
      { List }
    </div>
  )
}
