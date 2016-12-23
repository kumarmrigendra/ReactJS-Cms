import React from 'react';
import { Link } from  'react-router';
import {getEditorPick, updateEditorPick} from './../services';
import { default as List } from "./List";

export default React.createClass({
	getInitialState(){
		return{
			data:[],
		}
	},
	componentWillMount(){

		var that=this;
		getEditorPick({category:'home'},function (err,res) {
			that.setState({
				data:res.data
			})
			console.log(res);
			console.log(res.data);
		});

	},

 searchStatus:false,
 shouldComponentUpdate(nextProps, nextState){
 	console.log(this.state.data)
 	console.log(nextState.data);
 	if(this.searchStatus==nextProps.searchStatus){
 		this.searchStatus=nextProps.searchStatus;
 		return false;
 	}
	this.searchStatus=nextProps.searchStatus;
 
 	 return true;
 },
  GroupName(e){
    console.log(e);
  },
	render(){
		console.log(this.state.data);
		return (
			<div className="row layout-one" id="topic-wrapper">
	      	<div className="col m3 layout-one-sidebar ">
			     <div className="top-actions">
			     	<div className="header">
			     		<h5>Editor's Picks</h5>
			     	</div>
			     	<div id="add-wrapper">
			     		<Link id="add-button">
			      		<i className="material-icons">add</i>
			      		Add Editor's Picks
			     		</Link>
			     	</div>
			     </div>
      	  	
			</div>
			<div className="col m9 offset-m3 layout-one-content">
				<div className="card layout-one-card">
					<h3>Welcome to Editor Picks</h3>
					
		            	<List search={this.props.search} data={this.state.data} />

				</div>
			</div>	
	      	
      </div>
			)
	}
});