import React from 'react';
import { Link, browserHistory } from  'react-router';
import { update, create } from './../services';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import { If, ElseIf, Spinner } from './../../utils/components';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || {},
      allUsersData:this.props.allUsersData,
      selected:[],
      searchFromAll:false,
      members:[],
      membersId:[],
      freshMembers:{
        ids:[],
        data:[]
      },
      create:(this.props.route && this.props.route.path=='create'),
      showPopup:false,
      message:''
    }
  },
  componentWillReceiveProps(props){
    var that=this;
    this.setState({
      data:props.data || {},
      allUsersData:props.allUsersData
    },function(){
      if(that.state.create) return;
      that.getGroupUsersData()
    })
  },
  componentWillMount(){
    var that=this;
    this.getGroupUsersData()
  },
  getGroupUsersData(data){
    var that=this;
    var temp=[];
    var id=[];
    var data=that.state.data.users;
    var allUsers=that.state.allUsersData || [];
    if(typeof(data)=='undefined') return;
    for(var i=0;i<allUsers.length;i++){
      if(data.indexOf(allUsers[i]._id)>-1){
        temp.push(allUsers[i])
        id.push(allUsers[i]._id)
      }
    }
    this.setState({
      members:temp,
      membersId:id
    })
  },
  searchUser(e){
    this.setState({
      searchValue:e.target.value 
    })
    if(e.target.value.length>2){
      this.setState({
        searchFromAll:true
      })
    }
    else{
      this.setState({
        searchFromAll:false
      })
    }
  },
  addMember(member,type){
    if(type=='fresh-member' || type=='member') return;
    var freshMembers=this.state.freshMembers;
    freshMembers.data.push(member);
    freshMembers.ids.push(member._id);
    this.setState({
      freshMembers    
    })
  },
  removeMember(i){
    var members=this.state.members;
    members.splice(i,1);
    var membersId=this.state.membersId.slice();
    membersId.splice(i,1)
    this.setState({
      members,
      membersId
    })
  },
  removeFreshMember(i){
    var freshMembers=JSON.parse(JSON.stringify(this.state.freshMembers));
    freshMembers.data.splice(i,1);
    freshMembers.ids.splice(i,1);
    this.setState({
      freshMembers
    })
  },
  save(){
    var that=this
    var groupid=this.state.data._id
    var form={
      "groupname":this.state.data.groupname,
      "users": that.state.membersId.concat(this.state.freshMembers.ids),
      "exists": 1,
    }
    update({data:form,groupid}, (err, res) => {
      if (res.status==1){
        toast.show(Toast.saved);
        browserHistory.push('/groups');
      }
      if (err || res.status<1) {
        toast.show(Toast.error);
      }   
    }) 
  },
  create(){
    var that=this;
    var form={
      "groupname":this.state.data.groupname,
      "users": that.state.membersId.concat(this.state.freshMembers.ids),
      "exists": 1,
    }
    create({data:form}, (err, res) => {
      if (res.status==1){
        toast.show(Toast.created);
        browserHistory.push('/groups');
      }
      else if (res.status==-1){
        toast.show(Toast.exists);
      }
      if (err) {
        toast.show(Toast.error);
      }   
    }) 
  },
  input(e,key){
    var data=this.state.data;
    data[key]=e.target.value;
    this.setState({
      data,
    })
  },
  filterUserSearch(item){
    if(this.state.membersId.indexOf(item._id)>-1) return 'member';
    if(this.state.freshMembers.ids.indexOf(item._id)>-1) return 'fresh-member';
    return 'none';
  },
	render() {
  	var component=this,
    data=this.state.data;
    var SearchUsers=null;
    if(component.state.searchFromAll){
      SearchUsers=component.state.allUsersData.map(function(item,i){
        if(item.display_name.toLowerCase().indexOf(component.state.searchValue.toLowerCase())<0){
          return null;
        }
        var type=component.filterUserSearch(item);
        return( 
          <div className={type + " m4 search-result col"} key={i} onClick={()=>component.addMember(item,type)}>
            <div className="card"> 
              <div className="card-content">
                <span className="highlight">
                  {item.display_name}
                </span>
              </div>
            </div>
          </div>
        )             
      })
    }
    return (
      <div className="card layout-one-card">
        <If test={this.state.create}>
          <div className="card-title">Create category</div>
        </If>
        <If test={!this.state.create}>
          <div className="card-title">Edit - <i>{data.groupname}</i></div>
        </If>
        <Spinner show={this.state.saving}/>
        <div className={(this.state.saving ? 'saving ':'') + 'card-content' }>
          <div className="custom-input">
            <label>Title</label>
            <input type="text" value={data.groupname} onChange={(e)=>this.input(e,'groupname')}/>
          </div>
          <div className="row">
            <div className="col m12">
              <label>Members</label>
            </div> 
            <Members component={component} list={this.state.members} type={'member'} />
             <Members component={component} list={this.state.freshMembers.data} type={'fresh-member'} />
          </div>
          <div className="row">
            <div className="col m12">
              <label> Add Members</label>
            </div>
            <div className="col m4 search-card">
              <div className="card">
                <div className="card-content white-text yellow darken-2">
                  <input type="text" placeholder="Enter Name to be Searched" onChange={this.searchUser}/></div>
                </div>
              </div>
              {SearchUsers}
            </div>        
          </div>
          <div className="card-action">
            <If test={!this.state.create}>
              <button className="btn waves-effect waves-light" onClick = { this.save }>
                Update
                  <i className="material-icons right">send</i>
              </button>
            </If>
            <If test={this.state.create}>
              <button className="btn waves-effect waves-light" onClick = { this.create }>
                Create
                  <i className="material-icons right">send</i>
              </button>
            </If>
          </div>     
      </div>
    )
  }
});

var Members= function(props){
  var component=props.component;
  if(!props.list) props.list=[];
  var List=props.list.map(function(item,i){
    return( 
      <div className={props.type+ ' m4 col'} key={i}>
        <div className="card"> 
          <div className="card-content">
            <span className="highlight">
              {item.display_name}
            </span>
            <If test={props.type=='member'}>
              <div className="remove" onClick={()=>component.removeMember(i)}>
                <i className="material-icons">close</i>
              </div>
            </If>
            <If test={props.type=='fresh-member'}>
              <div className="remove" onClick={()=>component.removeFreshMember(i)}>
                <i className="material-icons">close</i>
              </div>
            </If>
          </div>
        </div>
      </div>
    )
    })
  return ( <div>{List} </div>)
}