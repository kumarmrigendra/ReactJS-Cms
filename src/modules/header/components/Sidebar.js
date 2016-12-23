import React from 'react';
import { Link } from  'react-router';
import  Overlay from './Overlay';
import { default as Modules } from './Modules';

import {COLORS, MODULES} from './../../../stub/APPLICATION';
export default React.createClass({
  getInitialState(){
    return {
      status:this.props.status,
      permissions:this.props.permissions,
      user:this.props.user
    }
  },
  componentWillReceiveProps(props){
      this.setState({
        status:props.status,
        permissions:props.permissions,
        user:props.user
      })
  },
  componentDidUpdate(){
    if(this.input){
      this.input.focus();
    }
  },
  close(){
    this.props.close();
  },
  render() {
    if(!this.state.status){
      return null;
    }
    return (
       
       <section id="sidebar-wrapper">
        <Overlay color={COLORS.theme} click={this.close}/>
         <Modules close={this.close} permissions={this.props.permissions}/> 
              
       </section>
    )
  }
});