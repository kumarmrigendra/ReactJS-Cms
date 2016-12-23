import React from 'react';
import { Link } from 'react-router';
import { If, ElseIf, Spinner } from './../../utils/components';
import { getALLUSERS, getPermissions, getGroups } from './../services';
export default React.createClass({
  getInitialState() {
    return {
      data: [],
      username: '',
      permission: [],
      usergroups: [],
      searchString:'',
      spinner:false
    }
  },
  componentDidMount() {
    var that = this;
    this.setState({ spinner:true });
    getALLUSERS({}, function(err, users) {
      getPermissions({}, function(err, perms) {
        getGroups({}, function(err, groups) {
          that.setState({
            usergroups: groups.data,
            permission:perms.data,
            data:users.data,
            spinner: false
          });
        });
      });
    });
  },
  getData(params) {
    if (params.username) {
      return this.findBySlug(params.username)
    }
  },
  findBySlug(username) {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].username == username)
        return this.state.data[i];
    }
    return {};
  },
  listSearch(e) {
    var str = e.target.value;
    this.setState({
      searchString: str
    })
  },
  render() {
    var component = this;
    var children = null;
    if (this.props.children) {
      children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, {
          data: component.getData(child.props.params),
          permission: component.state.permission,
          usergroups: component.state.usergroups
        })
      })
    }
    return (
      <div className="row layout-one" id="user-wrapper">
        <div className="col m3 layout-one-sidebar">
          <div className="top-actions">
            <div className="header">
              <h5>Users</h5>
            </div>
            <div id="add-wrapper">
              <Link to="/users/create" id="add-button">
                <i className="material-icons">add</i>
                New User
              </Link>
            </div>
            <div className="search">
              <i className="material-icons">search</i>
              <input placeholder="Search Users" value={this.searchString} onChange={this.listSearch} />
            </div>
          </div>
           <If test={this.state.spinner}>
            <div className='allUserSpinnerContainer'> 
              <Spinner show='true'/>
             </div>
          </If>
          <ul className="user-list" ref={(link) => { this.sidebarList = link; }}> 
            {
              this.state.data.map(function(user,i){
                if (user.display_name.toLowerCase().indexOf(component.state.searchString.toLowerCase().trim()) < 0) {
                  return null;
                }
                return(
                  <li className=""  key={i}>
                    <Link activeClassName="active" to={'/users/' + user.username}>
                      <span className="user-image"><img src={user.profile_pic} alt="" className="" /></span>
                      {user.display_name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>

        </div>
        <If test={this.props.children}>
          <div className="col m9 offset-m3 layout-one-content" >
          {children}
          </div>
        </If>  
        
      </div>
    )
  }
});
