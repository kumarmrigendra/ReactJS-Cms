

                    import React from 'react';
import {default as Tile} from'./Tile';
export default React.createClass({
	getInitialState(){
		return {
			topics:this.props.topics
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			topics:props.topics
		})
	},
	render() {
			var children=this.state.topics.map((topic) =>
				<li className="collection-item avatar">
			 
		      <span className="title">{topic.topic_name}</span>
		      <p>{topic.modified_date}</p>
		    
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



// "title": $scope.searchResultsAll.topicData.data[k].topic_name,
// "type": 'Topic',
// "_id": $scope.searchResultsAll.topicData.data[k]._id.$oid,
// "last_upd_date": $scope.searchResultsAll.topicData.data[k].modified_date,
// "last_upd_by": "",
// "status": "",
// "profile_pic": "",
// "show": ""
