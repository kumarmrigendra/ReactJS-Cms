import React from 'react';
export default React.createClass({
	getInitialState(){
		return {
//			status:this.props.status
		}
	},
	overlayTap(){
		console.log('overlayTap')
		if(this.props.click){
			this.props.click();
		}
	},
	componentDidMount(){
		
	},
  	render() {
    	return (
           <div className="filters card">
				 	<div className="filter">
					      <input type="checkbox" className="filled-in" name="article-filter" id="article-filter" defaultChecked />
					      <label htmlFor="article-filter">Article</label>
				    </div>
				    <div className="filter">
					      <input type="checkbox" className="filled-in" id="author-filter" />
					      <label htmlFor="author-filter">Author</label>
				    </div>
				    <div className="filter">
					      <input type="checkbox" className="filled-in" id="category-filter"/>
					      <label htmlFor="category-filter">Category</label>
				    </div>
				    <div className="filter">
					      <input type="checkbox" className="filled-in" id="topic-filter"  />
					      <label htmlFor="topic-filter">Topics</label>
				    </div>
				 </div>
     
    )
  }
});