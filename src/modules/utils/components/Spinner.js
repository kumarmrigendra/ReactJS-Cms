import React from 'react';
export default React.createClass({
  getInitialState() {
    return {
    	show:this.props.show || false
    }
  },
  componentWillReceiveProps(props){
  	this.setState({
  		show:props.show
  	})
  },
  render: function() {
    if(!this.state.show) return null;
    return (
    	<div className="spinner"></div>
    	)
  }
});
