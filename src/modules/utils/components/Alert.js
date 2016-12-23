import React from 'react';
export default React.createClass({
  render: function() {
    return ( 
			<div id = { this.props.id } className = "mdl-js-snackbar mdl-snackbar" >
     	 	<div className = "mdl-snackbar__text"></div> 
      	<button className = "mdl-snackbar__action" type = "button"></button> 
    	</div>
    )
  }
});
