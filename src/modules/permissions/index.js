import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Edit from './components/Edit';
import View from './components/View';

const userManagement = (
	<Route path="permissions" component={components}>
		<Route path="create" component={Edit}/>
		
		<Route path=":permission" component={View}/>
		
		<Route path=":permission/edit" component={Edit}/>

	</Route>
	
 );
export default userManagement;
