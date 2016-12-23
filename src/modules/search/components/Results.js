import React from 'react';
import {Articles, Authors, Category, Topics} from './Tiles';
import {default as Tile} from'./Tiles/Tile';
import { If, ElseIf, Alert, Spinner } from './../../utils/components';

export default React.createClass({
	getInitialState(){
		return {
			results:this.props.results,
			options:this.props.options,
		}
	},
	componentWillReceiveProps(props){
			
			this.setState({
				results:props.results
			})
	},
	componentDidMount(){
		
	},
	render() {

		if(this.state.results=='empty' || this.state.results == 'error'){
			return(
				<div id="search-results-wrapper" className="white card">
      				Nothing to show
      			</div>
			)
		}else if(this.state.results == 'loading'){
			return(
				<div id="search-results-wrapper" className="white card">
      				<Spinner show={true} />
      			</div>
				
			)
		}
			

  	return (
      	 <div id="search-results-wrapper">
      		<If test={this.state.options.articles}>
	      		<Articles header="Articles" close={this.props.close} options={this.state.options.articles} articles={this.props.results.articleData.data} />
    		</If>
    		<If test={this.state.options.authors}>
	    		<Authors header="Authors" authors={this.props.results.userData.data} />
	      	</If>
	      	<If test={this.state.options.categories}>
		      	<Category header="Categories" categories={this.props.results.categoryData.data} />
	      	</If>
	      
	      	<If test={this.state.options.topics}>
		      	<Topics header="Topics" topics={this.props.results.topicData.data} />
	      	</If>

       		
      	</div>

       	
    )
  }
});