import React from 'react';
export default React.createClass({
  render() {
    return ( 
    	<div className="card-panel header z-depth-0 no-bottom-margin">
    		{ this.props.title } 
  		</div>
    )
  }
});
