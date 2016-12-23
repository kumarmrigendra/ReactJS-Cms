import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Edit from './components/Edit';
import View from './components/View';

const userManagement = (
	<Route path="categories" component={components}>
		<Route path="create" component={Edit}/>
		<Route path=":category" component={View}/>
		<Route path=":category/edit" component={Edit}/>
	</Route>
 );
export default userManagement;
