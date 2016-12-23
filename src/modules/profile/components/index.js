import React from 'react';
import { Link, browserHistory } from 'react-router';
import { localUser, toast } from './../../utils/functionals';
import { If, ElseIf } from './../../utils/components';
import { getUser, editUser, resetPassword} from './../services';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
  getInitialState() {
    return {
      data: [],
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
  render() {
    var component = this;
    return (       
      <div className="col l12">  
        <div className="col l12"><br/></div>
        <h4 className="col l12 blue-text text-darken-2">Edit Profile</h4>
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
          <div className="input-field col l12">
            <textarea placeholder="About Me" className="materialize-textarea" value={this.state.data.about_me} onChange={(event)=> this.input(event,'about_me')} id="eAboutme" />
            <label className="active" htmlFor="eAboutme">About me</label>
          </div> 
        </div>
        <div className="card-action primary-background white-text">
          <button className="btn" type="submit" onClick={this.updateProfle}>Update
            <i className="material-icons right">send</i>
          </button>
        </div>                  
      </div>
    )
  }
});

var InputBox= function (props) {
  var component=props.component;
  if(!component) return null;
    return (
     
        <div className="input-field col l6">
          <input className="validate" id={props._key} disabled={props.disabled} type={props.type || 'text'}  value={component.state.data[props._key]} onChange={(e)=> component.input(e,props._key)} />
          <label className="active" htmlFor={props._key}>{props.placeholder}</label>
        </div>
   );
}
var InputRow=function(props){
   var List = props.list.map((item,i)=>
      <InputBox key={i} type={item.type || null } component={props.component} edit={props.edit} placeholder={item.label} _key={item._key} disabled={item.disabled || false}/>
    );
   return (<div className="row">{List}</div>)
}
