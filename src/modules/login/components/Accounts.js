import React from 'react';
import LoginHeader from './LoginHeader';
import { localUser } from './../../utils/functionals';
import { Link, withRouter, browserHistory } from 'react-router'
export default withRouter(React.createClass({
  getInitialState() {
    return {
      localUsers: {}
    }
  },
  componentWillMount() {
    if (this.props.user) {
      browserHistory.push('/dashboard');
      return;
    }
    var localUsers = localUser.getAll();
    this.setState({
      localUsers
    });
    if (Object.keys(localUsers).length <1 && localUsers.constructor === Object) {
      this.props.router.replace('/login');
    }
  },
  removeAccount(username){
    var userData=localUser.remove(username);
    if(userData){
      this.props.success({context:'user',case:'removedFromLocal',data:userData.info});
      this.setState({
        localUsers:localUser.getAll()
      })
    }else{
      this.props.error({context:'default'});
    }
  },
  render() {
    return ( 
      <div id="login-form">
          <LoginHeader title = "Choose account" />
          <div className="card-panel z-depth-0 no-background">
            <div className="row">
               <UserList users = { this.state.localUsers } removeAccount={this.removeAccount}/>
              <Link 
              to = "/login/accounts/add">     
              <button className="btn">Add an Account</button>
              </Link>
                   
            
            </div>
          </div> 

         
        </div>
 
    )
  }
}));

var UserList = function userList(props) {
  var users = props.users;
  var arr = []
  Object.keys(users).forEach(function(e) {
    arr.push(users[e].info);
  });
  var ListItems = arr.map((user) =>
   
    <li key={ user.username } className="collection-item">
      <img src="http://materializecss.com/images/yuna.jpg" alt="" className="circle responsive-img"/> 
      <div className="title"><Link to = { "/login/" + user.username }>{ user.display_name } </Link></div>
      <a href="#!" className="secondary-content" onClick={() => props.removeAccount(user.username)}> <i className="material-icons">delete_sweep</i></a>
    </li>


  );
  return ( <ul className="collection account-list"> { ListItems } </ul>);
}
