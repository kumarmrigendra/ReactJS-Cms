import React from 'react';
import { Link, browserHistory } from 'react-router';
import { invalidateUser, resetPassword } from './../services';
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
      create:this.props.data ? false : true,
      changePassword:false,
      edit:false,
      viewPerm:[],
      viewGroup:[]
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
      },function(){
         that.getViewData(data,that.state.permission,that.state.usergroups)
    })
  },
  componentWillMount(){
    var that=this;
    that.getViewData(that.state.form,that.state.permission,that.state.usergroups)
  },
  getViewData(form,permission,usergroups) 
  {
    var that=this;
    var temp=[];
    var temp2=[];
    var perm=form.perm;
    var groups=form.groups
    if(typeof(perm)=='undefined') return;
    for(var i=0;i<permission.length;i++){
      if(perm.indexOf(permission[i]._id)>-1){
        temp.push(permission[i])
      }
    }
    for(var i=0;i<usergroups.length;i++){
      if(groups.indexOf(usergroups[i]._id)>-1){
        temp2.push(usergroups[i])
      }
    }
    this.setState({
      viewPerm:temp,
      viewGroup:temp2
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
  changePassword(){
    this.setState({
      changePassword:true
    })
  },
  updatePassword(){
    var that=this;
    var passwordData={
      "new_pass" : that.state.form.password,
      "suserid": that.state.form._id
    }
    // var new_pass=that.state.form.password;
    console.log(passwordData);
    resetPassword(passwordData, (err, res) => {
      if (res.status==1){
        toast.show(Toast.updated);
        browserHistory.push('/users');
      }
      if (res.status==0 || err) {
        toast.show(Toast.error);
        return;
      }   
    })
  },
  closePasswordPopup(){
    this.setState({
      changePassword:false
    }) 
  },
  edit(){
    this.setState({
      edit:true
    })
  },
  // static propTypes = {
  //   history: React.PropTypes.object
  // }, 
  invalidateUser() {
    var self=this;
    var suserid = this.state.form._id;
    
    
    invalidateUser({ suserid }, (err, res) => {
      if(res.status==0 || err){
        toast.show(Toast.error);
      }
      if (res.status==1){
        toast.show(Toast.invalidated);
        // self.props.history.push('/users');
        self.props.history.pushState(null, '/users')
      }
    })
  },
  render() {
    var component=this;

    return (
      <div className="card layout-one-card">
        <If test={!this.state.changePassword }>
          <div className="col l12">
            <div className="row"><div className="col l12 card-title">View User</div></div>
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
            <div className="row">
              <div className=" col l6">
                <div className="active">About Me</div>
                <div className="blue-text text-darken-1" >{this.state.form.about_me}</div>
              </div>
            </div>
            <div className="row"> 
              <div className="col l6">
                <div className="active">Permissions</div>
                {
                  component.state.viewPerm.map(function(item,i){          
                    return( 
                      <div key={i} className="blue-text text-darken-1" >{item.permname}</div>
                    )
                  })
                }
              </div>
            </div>
            <div className="row"> 
              <div className="col l6">
                <div className="active">Groups</div>
                {
                  component.state.viewGroup.map(function(item,i){          
                    return( 
                      <div key={i} className="blue-text text-darken-1" >{item.groupname}</div>
                    )
                  })
                }
              </div>
            </div>
            <Link activeClassName="active" to={'/users/edit/' + this.state.form.username} className="btn" type="submit" onClick={this.edit}>Edit
                <i className="material-icons right">send</i>
            </Link>
            <button className="btn" type="submit" onClick={ this.changePassword }>Change Password
                <i className="material-icons right">send</i>
            </button>
            <button className="btn" type="submit" onClick={this.invalidateUser}>Invalidate</button>         
          </div> 
        </If>                            
        <If test={this.state.changePassword}>  
          <div className="col l12">
            <div className="input-field col l6">
              <input type="text" placeholder="Password" onChange={(event)=> this.input(event,'password')} id="changePassword" />
              <label className="active" htmlFor="changePassword">Password</label>
            </div>
            <div className="input-field col l6">
              <input type="password" onChange={this.confirmPassword} onBlur={this.matchPassword} id="Retype"/>
              <label className="active" htmlFor="Retype">Retype Password</label>
              {
                this.state.mismatch==true?<h5 className="col l12 red-text text-darken-1">* Password Mismatch</h5>:null
              }
            </div>
            <div className="input-field col l6">
              <div className="btn" onClick={component.updatePassword}>Update</div>
              <div className="btn" onClick={component.closePasswordPopup}>Back To Profile</div>
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
      <div className="blue-text text-darken-1" id={props._key}>{component.state.form[props._key]}</div>
    </div>
  );
}
var InputRow=function(props){
 var List = props.list.map((item)=>
    <InputBox key={item._key} type={item.type || null } component={props.component} edit={props.edit} placeholder={item.label} _key={item._key} disabled={item.disabled || false}/>
  );
 return (<div className="row">{List}</div>)
}

