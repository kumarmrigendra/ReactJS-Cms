import React from 'react';
import Auth from './../auth';
import { localUser, user, toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import LoginHeader from './LoginHeader';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import { login } from './../services';
import { If, ElseIf, Alert, Spinner } from './../../utils/components';

export default withRouter(React.createClass({
  getInitialState() {
    return {
      form: {
        username: '',
        password: ''
      },
      localUsers: null,
      hasLocalUsers:false,
      spinner:false
    }
  },
  handleInput(e,key) {
    var form=this.state.form;
    form[key]=e.target.value;
    this.setState({
      form
    });
  },

  checkUser(username) {
    var user = localUser.getByUsername(username);
    if (username && user) {
      this.setUser(user);
    } else {
      this.props.router.replace('/login');
      return false;
    }
  },
  setUser(user) {
    this.setState({
      form: {
        password: '',
        username: user.info.username
      },
      localUser: user
    });
  },
  checkLocalUsers() {
    var localUsers = localUser.getAll();
    var hasLocalUsers=false;
    if(Object.keys(localUsers).length> 0 && localUsers.constructor === Object){
      hasLocalUsers=true;
    }
      this.setState({
      localUsers,
      hasLocalUsers
    });
    if (this.props.route.name == 'login' && hasLocalUsers) {

      this.props.router.replace('/login/accounts');
    }
  },
  componentWillMount() {
    if (this.props.user) {
      browserHistory.push('/dashboard');
      return;
    }
    if (!this.checkUser(this.props.params.username)) {}
    this.checkLocalUsers();
  },
  handleSubmit(event) {
    this.setState({ spinner:true })
    event.preventDefault();
    login(this.state.form, (err, res) => {
      this.setState({ spinner:false })
      if (err) {
        toast.show(Toast.error());
        console.log('error', err);
        return;
      }
      if (!res.loggedIn) {
        toast.show(Toast.warning());
        return;
      }

      user.login(res);
      toast.show(Toast.success());
      this.props.login();
      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/dashboard')
      }
    })
  },

  render() {
   var loadingClass= (this.state.spinner) ? 'loading' : '';

    return (
      <div className="card " id="login-form">
        <LoginHeader title = "Sign in to your account" />
        <div className={loadingClass + " card-content"}>
          
          <form className="">
            <div className="">
              <If test = {!this.state.localUser }>
                <div className="login-input" id="username">
                  <label htmlFor='sername'>Username</label>
                  <input type="text" className="validate"
                    value = { this.props.value }
                    onChange = { (e) => this.handleInput(e,'username') }
                   />
                </div>
              </If>

              <If test = { this.state.localUser }>
                <UserIcon user = { this.state.localUser } /> 
              </If> 
                
            
              <div className=" login-input" id='password'>
                  <label htmlFor='password'>password</label>
                  <input type="password" className="validate"
                    value = { this.state.form.password }
                    onChange = { (e) => this.handleInput(e,'password') }
                   />
              </div>
             
               
                <button disabled={this.state.spinner} className="btn" onClick={this.handleSubmit} type="button" name="action">Login
                  <i className="material-icons right">send</i>
                </button>
               
           
             
                   
            </div>
          </form>
          
        </div>
         <If test={this.state.spinner}>
                  <Spinner show='true'/>
                </If>
          <If test={this.state.hasLocalUsers}>
                <div className="card-action">
                <Link to="/login/accounts" className="white-text">
                   Saved Accounts 
                </Link> 
                </div>
          </If>
       
      </div>

      
   
    )
  }
}));


var UserList = function userList(props) {
  var items = props.items;
  var ListItems = items.map((item) =>
    <li> { item } </li>
  );
  return ( <ul> { ListItems } </ul>);
}

var UserIcon = function UserIcon(props) {
 var user=props.user.info;
  return (

    <div  key={user.username }  className=" text-center">
        <div className="card no-background no-bottom-margin z-depth-0">
          <div className="row">
            <div className="col s6 offset-s3">
              <img src="http://materializecss.com/images/yuna.jpg" alt="" className="responsive-img"/> 
            </div>
          </div>
          <div className="row">
            <div className="col s12">
                <h5 className="black-text">
               { user.display_name } 
               </h5>
             
              <h6 className="black-text">
               { user.username } 
               
              </h6>
            </div>
          </div>
        </div>
      </div>

 );
}
