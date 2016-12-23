import React from 'react';
import { Link, Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import login from './../login/';
import Permissions from './../permissions';
import dashboard from './../dashboard/';
import userManagement from './../users/';
import quoteManagement from './../quotes/';
import profile from './../profile/';
import categories from './../categories';
import topics from './../topics';
import editorPick from './../editorPick';
import groups from './../groups/';
import article from './../article/';
import homedesign from './../homedesign';


const routes = (
  <Route path="/" component={App}>
	 <IndexRoute component={App} />
    { login }
    { dashboard }
    { userManagement }
    { groups }
    { quoteManagement }
    { categories }
     { topics }
    { Permissions }
    { editorPick }
    { profile }
    { article }
    {homedesign}
    
     <Route path="*" component={NotFound}/>
    
  </Route>
);
export default routes;