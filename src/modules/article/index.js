import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
const editManagement = (	
	<Route path="article">
		<Route path="new" component={components}/>
		<Route path="edit/:id" component={components}/>
	</Route>
);
export default editManagement;
