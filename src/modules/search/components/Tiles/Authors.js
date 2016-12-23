import React from 'react';
import {default as Tile} from'./Tile';
export default React.createClass({
	getInitialState(){
		return {
			authors:this.props.authors
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			authors:props.authors
		})
	},
	render() {
		
			var children=this.state.authors.map((author, i) =>
				<li className="collection-item avatar" key={i}>
			    <img src={author.profile_pic} alt="" className="circle" />
		      <span className="title">{author.first_name} {author.last_name}</span>
		    
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

//  "title": $scope.searchResultsAll.userData.data[i].first_name + " " + $scope.searchResultsAll.userData.data[i].last_name,
// "type": 'User',
// "_id": $scope.searchResultsAll.userData.data[i]._id.$oid,
// "last_upd_date": "",
// "last_upd_by": "",
// "status": "",
// "profile_pic": $scope.searchResultsAll.userData.data[i].profile_pic,
// "show": ""