import React from 'react';
export default React.createClass({
	getInitialState(){
		return {
			results:this.props.results
		}
	},
	render() {
		
  		return (
			 	<div className="card search-results">
			 		<h4 className="header">{this.props.header}</h4>
					<ul className="collection">
					 	
					 	{ this.props.children }
					 	</ul>
				</div>
  		);

  }
});


