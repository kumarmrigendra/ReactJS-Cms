import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Edit from './components/Edit';
import View from './components/View';
const groupManagement = (
	<Route path="groups" component={components}>
		<Route path="create" components={Edit}></Route>
		<Route path=":groupname" components={View}></Route>
	    <Route path="edit/:groupname" components={Edit}></Route>
	</Route>
);
export default groupManagement;
