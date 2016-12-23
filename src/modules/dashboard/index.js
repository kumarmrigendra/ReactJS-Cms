import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Dashboard from './components/dashboard';
import { user } from './../utils/functionals';
var checkAuth=function check_auth(nextState, replace) {
  if (!user.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
const dashboard = (
    <Route path ="/dashboard" component={Dashboard} onEnter={checkAuth}>
    </Route>
);
export default dashboard;