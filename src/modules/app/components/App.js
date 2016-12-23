import React from 'react';
import { Link, withRouter } from 'react-router';
import { If, ElseIf } from './../../utils/components';
import { localUser } from './../../utils/functionals';
import Header from '../../header/components/header';
import Overlay from '../../header/components/Overlay';
import Search from  '../../search/components';
import { default as TOAST } from './../stub/TOAST';
import Sidebar from '../../header/components/Sidebar';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default withRouter(React.createClass({
  getInitialState:function(){
    return {
      user:localUser.get(),
      permissions:localUser.getPermissions(),
      overlay:false,
      search:{
        open:false,
        options:{
            'articles':{},
            'authors':{},
            'topics':{},
            'categories':{}
        }
      },
      sidebar:false
    };
  },
  login(){
    var user=localUser.get();
    this.setState({
      user,
      permissions:localUser.getPermissions()
    })

  //  this.success({context:'login','case':'success',data:user.info});
  },
  logout(){
    localStorage.removeItem('token');
    window.location='/login';
    // this.success({context:'user','case':'logout'});
  },
  componentWillMount(){
   if(!this.props.children){
      this.props.router.replace('/dashboard');
   } 
  },
  error (event) {
    var options=TOAST(event);
    this.refs.container.error(
      options.message,
      "Title", {
      timeOut: 5000,
    });
  },
  success (event) {
   
    var options=TOAST(event);
    this.refs.container.success(
      options.message,
      "Title", {
      timeOut: 5000,
    });
  },
  toggleOverlay(){
    this.setState({
      overlay:!this.state.overlay
    })    
  },
  openSearch(options){
   
    this.setState({
      search:{
        open:true,
        options:options || {
           'articles':{},
            'authors':{},
            'topics':{},
            'categories':{}
        }
      }
    })
  },
  closeSearch(){
    this.setState({
      search:{
        open:false,
        options:{}
      }
    })
  },
  openSidebar(){
    this.setState({
      sidebar:true
    })
  },
  closeSidebar(){
    this.setState({
      sidebar:false
    })
  },
  render: function() {
    var self=this;
    if(this.props.children){
      var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
      user: self.state.user,
      login:self.login,
      logout:self.logout,
      error:self.error,
      success:self.success,
      toggleOverlay:self.toggleOverlay,
      permissions:self.state.permissions,
      search:self.openSearch
      })
      })
      return <div id="container" className="">
        <div>
          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
        </div>
        <If test={this.state.user}>
        <Header user={this.state.user} openSearch={this.openSearch} openSidebar={this.openSidebar}/>
        </If>
        <If test={this.state.user}>
        
        <Search status={this.state.search.open} options={this.state.search.options} close={this.closeSearch}/>
        </If>
        <If test={this.state.user}>
        
        <Sidebar status={this.state.sidebar} user={this.state.user} close={this.closeSidebar} permissions={this.state.permissions}/>
        </If>
        <section id="content">
          {children}
        </section>
      </div>  
    }else{
      return <div>scoopwhoop</div>
    }
    
  }
 
}));
