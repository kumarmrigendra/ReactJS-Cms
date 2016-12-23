import React from 'react';
import { Link } from  'react-router';
import { If, ElseIf } from './../../utils/components';
import { localUser, toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';

export default React.createClass({
	getInitialState(){
    return {
      status:this.props.status || false,
      content:this.props.content || ''
    }
  },
  componentWillReceiveProps(props){

    this.setState({
      status:props.status,
      content:props.content
    })
  },
  input(e){
      this.props.update(e.target.value);
  },
  render() {
    if(!this.state.status) { return null; }
    return (
       		<div className="row card-panel">
              <div className="input-field col l8">
                <textarea placeholder="Enter Content here" className="materialize-textarea" value={this.state.content} onChange={this.input}></textarea>
              </div>
            </div>    
           
    )
  }
});



