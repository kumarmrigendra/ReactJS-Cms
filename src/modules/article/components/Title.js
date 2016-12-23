
                  import React from 'react';
import { Link } from  'react-router';
import { If, ElseIf } from './../../utils/components';
import { localUser, toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';

export default React.createClass({
	getInitialState(){
		return {
		  status:this.props.status || false,
      title:this.props.title || ''
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      status:props.status,
      title:props.title
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
                <textarea placeholder="Enter Title here" className="materialize-textarea" onChange={this.input} value={this.state.title}></textarea>
              </div>
            </div>  
           
    )
  }
});



