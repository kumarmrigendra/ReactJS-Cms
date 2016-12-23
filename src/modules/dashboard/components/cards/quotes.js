import React from 'react';
import Services from './../../services';
import { If } from './../../../utils/components';

export default React.createClass({
	getInitialState(){
		return{
			quotes: {
				tumblr: [],
				pinterest: [],
			},
		}
	},
	componentDidMount(){
		var that = this; 
		Services.quotesAlert({},function(err,res) { 
             that.setState({
                    quotes: {
                    		tumblr: res.tumblr,
							pinterest: res.pinterest,
                    	}
                    });   
         });
	},
	render(){
		// console.log(this.state.quotes);
		return(
			this.state.quotes == 0  ? null : (<div className="youtube-container">
				<div className="row">
			        <div className="col s12 m12">
			          	{
			          		this.state.quotes.pinterest.map(function(item, i){
			          			return(
						          	<div className="card darken-1" key={i}>
							            <div className='card-content white-text padding-10'>
							            	<img className='quotes-image' src={ item.src } />
							            	<p className='tweet-text'>{item.description}</p>
							            	<p><span className='quotes-like'>Like</span><span className='quotes-number'>{ item.like }</span></p>
							            	<p><a href={item.keyword_url} target='_blank'>Click here for more from {item.keyword}</a></p>
							            </div>
							            
						          	</div>
						        )
				          	})
			          	}

			          	{
			          		this.state.quotes.tumblr.map(function(item, i){
			          			return(
						          	<div className="card darken-1" key={i}>
							            <div className='card-content white-text padding-10 color-black'>
							            	
							            	<If test={(item.type) === 'text'} >
							            		<div className='height-100pt-over-hide padding-10 grey lighten-4'>
								            		<h5>{item.text}</h5>
								            		<p className='right'>{item.by}</p>
								            	</div>
							            	</If>

							            	<If test={(item.type) === 'image'} >
							            		<img className='quotes-image' src={ item.src } />
							            	</If>

							            	<p><span className='quotes-like'>Like</span><span className='quotes-number'>{ item.like }</span></p>
							            	<p><a href={item.keyword_url} target='_blank'>Click here for more from {item.keyword}</a></p>
							            </div>
							            
						          	</div>
						        )
				          	})
			          	}
			        </div>
			      </div>
				</div>
			)
				
				
		)
	}
}); 