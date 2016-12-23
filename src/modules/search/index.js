import React from 'react';
import { Link } from  'react-router';
import  Overlay from './Overlay';
import {default as COLORS} from './../stub/COLORS';
import {search} from './services/search';
export default React.createClass({
	getInitialState(){
		return {
			status:this.props.status
		}
	},
	componentWillReceiveProps(props){
			this.setState({
				status:props.status
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
	search(){
		var searchString=this.input.value;
		search({searchString},function(err,res) {
			console.log('in component####\n\n\n',err,res);
		});
	},
  render() {
  	if(!this.state.status){
  		return null;
  	}
    return (
       <section id="search-wrapper">
       		<Overlay color={COLORS.theme}/>
       </section>
    )
  }
});