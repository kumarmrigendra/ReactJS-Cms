import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Create from './components/Create';
import View from './components/View';
const userManagement = (
    <Route path="/users" component={components}>
	    <Route path="create" component={Create}></Route>
	    <Route path=":username" component={View}></Route>
	    <Route path="edit/:username" component={Create}></Route>
	</Route>
 );
export default userManagement;

