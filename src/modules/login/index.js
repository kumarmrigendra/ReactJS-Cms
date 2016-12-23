import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Accounts from './components/Accounts';
import Logout from './components/Logout';
var logout=function(nextState,replaceState){
	
}
const login = (
	<Route name="login" path="/login">
  	<IndexRoute name="login" component={Login}/>
  	<Route path='/login/accounts'>
  		<IndexRoute component={Accounts}/>
  		<Route name="add-account" path="/login/accounts/add" component={Login} />
  	</Route>
  	<Route path="/login/password/reset" component={ForgotPassword} />
  	<Route path='/login/:username' component={Login}/>
  	<Route path='/logout' component={Logout} />
	</Route>
);
export default login;
