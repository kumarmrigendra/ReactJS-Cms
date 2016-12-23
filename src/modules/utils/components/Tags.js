

import React from 'react';
export default React.createClass({
  render: function() {
  	var data=this.props.data || [];
  	var Tags=null;

  	if(data.length>0){
  	 Tags = data.map((tag) =>
        <div className="chip">
        	{tag}
        </div>
       );
   }
  	 return(
  	 	<div>{Tags}</div>
  	 )
  }
});
