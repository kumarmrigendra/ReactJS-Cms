import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';
import Edit from './components/Edit';
import View from './components/View';
import Trending from './components/Trending';
import AddVideo from './components/AddVideo';
const homeDesign = (
	<Route path="homeDesign" component={components}>
		<Route path="edit/:type" component={Edit}/>
		<Route path=":type" component={View}/>
		<Route path="article/trending" component={Trending}/>
		<Route path="video/add" component={AddVideo}/>
	</Route>
 );
export default homeDesign;
