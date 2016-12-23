import React from 'react';
import {default as Tile} from'./Tile';
export default React.createClass({
	getInitialState(){
		return {
			categories:this.props.categories
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			categories:props.categories
		})
	},
	render() {
		
			var children=this.state.categories.map((category) =>
				<li className="collection-item avatar">
			   
		      <span className="title">{category.category_display}</span>
		    <p>{category.modified_date}
	         
	      </p>
		      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
		    </li>
    );

   if(children && children.length>0){
	   return (
   	 	<Tile header={this.props.header}>
   	 		{children}
   	 	</Tile>
   		)    	
    }else{
    	return null;
    }	
  }
});

  // "title": $scope.searchResultsAll.categoryData.data[j].category_display,
// "type": 'Category',
// "_id": $scope.searchResultsAll.categoryData.data[j]._id.$oid,
// "last_upd_date": $scope.searchResultsAll.categoryData.data[j].modified_date,
// "last_upd_by": "",
// "status": "",
// "profile_pic": "",
// "show": ""