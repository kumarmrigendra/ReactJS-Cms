import React from 'react';
import Services from './../../services';

export default React.createClass({
	getInitialState(){
		return{
			twitter: [],
		}
	},
	componentDidMount(){
		var that = this; 
		Services.twitterAlert({},function(err,res) { 
             that.setState({
                    twitter: res.twitter
                    });   
         });
	},
	render(){
		return(
			this.state.twitter == 0  ? null : (<div className="youtube-container">
				
				<div className="row">
			        <div className="col s12 m12">
			          	{
			          		this.state.twitter.map(function(item, i){
			          			return(
						          	<div className="card darken-1" key={i}>
							       		<div className="tweet-header">
							            	<div className="left">
							            		<img className="twitter-user-image" src={item.user_image.replace("_400x400", "_bigger")} />
							            	</div>
							            	<div className="left">
							            		<a href="#">{item.author_name}</a><br/>
							            		<a className="screen-name" href="#">@{item.author_screen_name}</a>
							            	</div>
							            </div>
							            <div className='card-content white-text padding-5'>
							            	<p className='tweet-text'>{item.text}</p>
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