import React from 'react';
import { Link } from  'react-router';
import  Overlay from './Overlay';
import { MODULES } from './../../../stub/APPLICATION';
import { If } from './../../utils/components';
import { localUser } from './../../utils/functionals';
const USER=localUser.get();
export default React.createClass({
  getInitialState(){
    return {
      permissions:this.props.permissions,
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      permissions:props.permissions,
    })
  },
  handleClick(){

  },
  render() {
    if(!USER) return;
    var modules=  Object.keys(MODULES).map((module,index) =>
      <If test={MODULES[module].active && this.props.permissions[MODULES[module].permission]}>
       <li><Link onClick={this.props.close} to={ MODULES[module].uri } >{ MODULES[module].title }
        </Link></li>
        
      </If>
    );
    return (
            <ul id="slide-out" className="side-nav">
               <li><div className="userView">
                  <div className="background">
                    <img src="http://materializecss.com/images/office.jpg"/>
                  </div>
                  <a href="#!user"><img className="circle" src="http://materializecss.com/images/yuna.jpg"/></a>
                  <a href="#!name"><span className="white-text name">{USER.info.display_name}</span></a>
                  <Link to="/logout"><span className="white-text email">logout</span></Link>
                   </div>
               </li>
                 <li> <Link to="/profile"><span className="">Profile</span></Link></li>
                    <li>  <a href="/logout"><span className="">Logout</span></a></li>
              
               
                <li><div className="divider"></div></li>
    <li><a className="subheader">Manage</a></li>
            {modules}
            </ul>

           
       
    )
  }
});

