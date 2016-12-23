import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Edit from './components/Edit';
import Feature from './components/Feature';
import View from './components/View';

const userManagement = (
	<Route path="topics" component={components}>
		<Route path="create" component={Edit}/>
		
		<Route path=":topic" component={View}/>
		
		<Route path=":topic/edit" component={Edit}/>
		<Route path=":topic/feature" component={Feature}/>

	</Route>
	
 );
export default userManagement;
