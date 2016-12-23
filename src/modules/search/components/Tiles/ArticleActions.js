import React from 'react';
import { default as Tile } from'./Tile';
import { Link } from  'react-router';
import { SITE } from './../../../../stub/APPLICATION';
import { If, Spinner } from './../../../utils/components'; 
import Services from './../../services/search';
import SweetAlert from 'sweetalert';

export default React.createClass({
	getInitialState(){
		return {
			close:true,
			purge:'',
			article: this.props.article || {},
		}
	},
	purge(){
		var self = this; 
		var articleid = self.props.article._id; 
		SweetAlert({
			title: "Purge request",
		  	text: "Submit to purge the article <span style='color: #2f2f2f; font-size: 16px; font-weight: 600;'>"+self.props.article.title+"</span>.",
		  	type: "info",
		  	showCancelButton: true,
		  	closeOnConfirm: false,
		  	showLoaderOnConfirm: true,
		  	html: true
		},
		function(){
		 	setTimeout(function(){
		  		Services.purge({articleid}, function(err, res){ 
		  			if(res.status === 1){
		  				SweetAlert("Purge finished.");
		  			}else{
		  				SweetAlert("Purge failed.");
		  			} 
				})	    
		  	}, 5000);
		}
		);
	},
	toggle(e){
		this.setState({
			close:!this.state.close
		})
	},
	trash(e){
		var self = this; 
		var articleid = self.props.article._id; 
		var alertText = '';
		var eventName = ''; 
		if(self.props.article.cur_state === 'published'){ 
		 		alertText = "Submit to moved the article <span style='color: #2f2f2f; font-size: 16px; font-weight: 600;'>"+self.props.article.title+"</span> to trash."
				eventName = 'unpublish';
			}
		 else{
		 	alertText = "Submit to deleted the article <span style='color: #2f2f2f; font-size: 16px; font-weight: 600;'>"+self.props.article.title+"</span>";	
		 	eventName = 'invalidate';
		 }
		SweetAlert({
		 	title: "Trash request",
		  	text: alertText,
		  	type: "info",
		  	showCancelButton: true,
		  	closeOnConfirm: false,
		  	showLoaderOnConfirm: true,
		  	html: true
		},
		function(){
		  	setTimeout(function(){
		  		Services[eventName]({articleid}, function(err, res){
		  			if(res.status === 1){
	 					if(eventName==='unpublish'){ 
		  					self.props.draft(self.props.id);		
		  				}else if(eventName === 'invalidate'){ 
		  					self.props.invalidated(self.props.id); 
		  				}
		  			} 
				});	
		    	SweetAlert("Request finished!");
		  	}, 2000);
		}
		);
	},
	componentWillReceiveProps(props){ 
		this.setState({
			article: props.article
		})
	},
	render() { 
		if(this.state.purge){
			return (
				<div className="overlay article-overlay">
					<Spinner show={true} />
				</div>
			)
		}
		if(this.state.close){
			return (
				<div className="secondary-content">
			     	<a onClick={this.toggle}><i className="material-icons">settings</i></a>
	      		</div>
			)
  		}else{
  			// console.log(this.state);
  			return (
  				<div>
  				 
				<div className="secondary-content">
			      	<a onClick={this.toggle}><i className="material-icons">settings</i></a>
			      	<a target="_blank" href={ SITE + '/preview/desktop/' + this.state.article._id}><i className="material-icons">dvr</i></a>
			      	<a target="_blank" href={ SITE + '/preview/mobile/' + this.state.article._id}><i className="material-icons">phone_iphone</i></a>
	      			<a title="purge" onClick={this.purge} ><i className="material-icons">refresh</i></a>
	      			<a title="trash" id={this.state.article._id} onClick={this.trash} >{this.state.article.cur_state === 'published' ? <i className="material-icons" >delete</i> : <i className="material-icons" >delete_forever</i> }</a>
	      			 

	      		</div>
	      		</div>
			)
  		}
  }
});
