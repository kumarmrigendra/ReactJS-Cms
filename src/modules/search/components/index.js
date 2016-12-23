import React from 'react';
import { Link } from  'react-router';
import  Overlay from './../../header/components/Overlay';
import {default as COLORS} from './../../../stub/COLORS';
import {search} from './../services/search';
import {default as Filters} from './Filters'; 
import {default as InputWrapper} from './Input'; 
import {default as Results} from './Results'; 
export default React.createClass({
	getInitialState(){ 
		return {
			status:this.props.status,
			options:this.props.options || {},
			results:'empty',
		}
	},
	componentWillReceiveProps(props){
			this.setState({
				status:props.status,
				options:props.options || {}
			})
	},
	componentDidUpdate(){
		if(this.input){
			this.input.focus();
		}
	},
	close(){
		this.props.close();
	},
	request:'',
	searchTimeout:null,
	search(searchString){
		var self=this;
		self.setState({
			results:'loading'
		});
		if(this.searchTimeout) clearTimeout(this.searchTimeout);
		this.searchTimeout=setTimeout(function(argument) {
			self.searchRequest(searchString);
		},2000)
	},
	searchRequest(searchString){
		
		var request=Date.now(),
			self=this;
		self.request=request;
		
		search({searchString},function(err,results) {
			if(self.request!=request) {
				console.log('ignored');
				return;
			}
			
			if(err){
				results='error';
			}
			self.setState({
				results
				
			})
		});
	},
  render() {
  	if(!this.state.status){
  		return null;
  	}
    return (
       <section id="search-wrapper">
       		<Overlay color={COLORS.theme} click={this.close}/>
       		<InputWrapper search={this.search} close={this.close}/>
       		<Filters />
       		<Results results={this.state.results} close={this.close} options={this.state.options}/>
       </section>
    )
  }
});