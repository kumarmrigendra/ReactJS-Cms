import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
window.React = React;
// original file
import routes from './modules/app/';

render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById('app'));
