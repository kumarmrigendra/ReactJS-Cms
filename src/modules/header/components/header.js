import React from 'react';
import { Link, browserHistory } from  'react-router';
import { Sidebar } from './Sidebar';
export default React.createClass({
  search(){
    this.props.openSearch();
  },
  backtoHome(){
   browserHistory.push('/dashboard');
  },
  render() {
    if(!this.props.user){
      return <div></div>;
    }
    return (
      <div className="navbar-fixed" id="main-header">
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo userDashboard" onClick={this.backtoHome}><span className="brandlogoImage"><img className="logo-image" src="https://s4.scoopwhoop.com/v4/static/sw/mobile/images/mobile-logo.png" /></span><span>ScoopWhoop</span></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="#" onClick={this.search}><i className="material-icons">search</i></a></li>
              <li><a href="/profile">{this.props.user.info.display_name}</a></li>
              <li><a href="#" onClick={this.props.openSidebar}><i className="material-icons">apps</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
});

