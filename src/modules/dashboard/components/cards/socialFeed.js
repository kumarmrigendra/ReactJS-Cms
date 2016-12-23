import React from 'react';
import { If } from './../../../utils/components';
import Youtube from './youtube';
import Twitter from './twitter';
import Quotes from './quotes';

let divStyle="";

export default React.createClass({
	getInitialState(){
		return{
			showSocialFeed: false,
		}
	},
	toggleSideFeed(){
		this.setState({showSocialFeed: this.state.showSocialFeed === true ? false : true });		
	},
	render(){
		
		divStyle = this.state.showSocialFeed === true ? {marginLeft: "-25px"} : {}; 

		return(
				<div className="side-feed">
					<p className="side-click-icon" onClick={this.toggleSideFeed} style={divStyle}><i className="material-icons">more_vert</i></p>
					<If test={!(this.state.showSocialFeed)} >
						<div className="side-feed-container">
							<Youtube />
							<Twitter />	
							<Quotes />
						</div>
					</If>	
					
				</div>	
			)
	}

})

