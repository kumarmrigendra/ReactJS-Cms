import React from 'react';
import { Route } from 'react-router';
import components from './components';
import View from './components/View';
const profileManagement = (	
	<Route>
	    <Route path="/profile" component={View}></Route>
	    <Route path="/profile/edit/:username" component={components}></Route>
	</Route>	
 );
export default profileManagement;

