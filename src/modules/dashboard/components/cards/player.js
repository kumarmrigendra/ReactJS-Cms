import React from 'react';
export default React.createClass({
	getInitialState(){
		return{
			currentVideo: this.props.currentVideo || {}	
		}
	},
	componentWillReceiveProps(props){ 
		this.setState({
			currentVideo: props.currentVideo
		})
	},
	render(){ 
		return(Object.keys(this.state.currentVideo).length == 0  ? null : (
			<iframe width="280" height="240" src={ 'https://www.youtube.com/embed/'+ this.state.currentVideo.video_id } frameBorder="0" allowFullScreen ></iframe>
			)
		)
	}
}) 