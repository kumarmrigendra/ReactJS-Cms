import React from 'react';
import { Link, browserHistory } from  'react-router';
import {invalidateGroup} from './../services';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import { If, ElseIf, Spinner } from './../../utils/components';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || [],
      allUsersData:this.props.allUsersData,
      members:[],
      membersId:[]
    }
  },
  componentWillReceiveProps(props){
    var that=this;
    this.setState({
      data:props.data,
      allUsersData:props.allUsersData
    },function(){
      that.getGroupUsersData()
    })  
  },  
  componentWillMount(){
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
  invalidateUser(){
    var that=this;
    var groupid=that.state.data._id;
    invalidateGroup({groupid}, (err, res) => {
      console.log(res);
      if (res.status==1){
        toast.show(Toast.invalidated);
        browserHistory.push('/groups');
      }
      if (err || res.status<1) {
        toast.show(Toast.error);
      }    
    }) 
  },
	render() {
  	var component=this,
    data=this.state.data;
    return (
      <div className="card layout-one-card">
        <If test={this.state.create}>
          <div className="card-title">Create category</div>
        </If>
        <If test={!this.state.create}>
          <div className="card-title">Group Name - <i>{data.groupname}</i></div>
        </If>
        <Spinner show={this.state.saving}/>
        <div className={(this.state.saving ? 'saving ':'') + 'card-content' }>
          <div className="row">
            <div className="col m12">
              <label>Members</label>
            </div>      
            {
              component.state.members.map(function(item,i){                   
                return( 
                  <div className="m4 col " key={i}>
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
          </div>
        </div>
        <div className="card-action">
          <Link className="btn" to={'/groups/edit/'+ data.groupname }>
             Edit
              <i className="material-icons right">send</i>
          </Link>
          <button className="btn " type="submit" onClick={this.invalidateUser}>Invalidate</button>
        </div>
      </div>
    )
  }
});