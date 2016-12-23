import React from 'react';
import Services from './../../services';
import { If } from './../../../utils/components';
import YoutubePlayer from './player/';

let divStyle='';
let firstNodeStyle = {backgroundColor: '#e71e62', color: '#fff'};
export default React.createClass({
	getInitialState(){
		return{
			youtube: [],
			currentVideo:{},
			showMoreVideo: false,
			listExpand: 'expand_more',
			firstNode: 0,
		}
	},
	componentDidMount(){
		var that = this; 
		var d1 = {
			search_term: [
			"Trailer",
			"Teaser",
			"Promo",
			"Peek"
			],
			channel_id: "UCyvOJDBxhi1yqW97hXw3BDw",
			statistics: {
			dislike_count: "0",
			like_count: "1",
			comment_count: "0",
			view_count: "81"
			},
			info_etag: "",
			_id: "584928f5e69b9c788f907673",
			channel_name: "UTVMotionPictures",
			meta: {
			video_title: "Bruno Mars - 24K Magic [Official Video]",
			video_url: "https://www.youtube.com/watch?v=UqyT8IEBkvY",
			thumbnails: {
			default: "https://i.ytimg.com/vi/UqyT8IEBkvY/mqdefault.jpg"
			},
			published_at: "2016-12-08T09:27:32.000Z",
			video_description: "The time to fight is now! Watch this new promo from #RogueOne: A #StarWars Story, in cinemas December 16. Rogue One tells the story of how a group of ..."
			},
			old: false,
			alerted: true,
			video_id: "UqyT8IEBkvY"
			};

		var d = {
			search_term: [
			"Trailer",
			"Teaser",
			"Promo",
			"Peek"
			],
			channel_id: "UCyvOJDBxhi1yqW97hXw3BDw",
			statistics: {
			dislike_count: "0",
			like_count: "1",
			comment_count: "0",
			view_count: "81"
			},
			info_etag: "gMxXHe-zinKdE9lTnzKu8vjcmDI/39iljPLdBJt-3NITvXoahA0PqjI",
			_id: "584928f5e69b9c788f907673",
			channel_name: "UTVMotionPictures",
			meta: {
			video_title: "Jyn Rallies The Rebel Alliance - Promo | In cinemas December 16",
			video_url: "https://www.youtube.com/watch?v=ReyC9e3SP44",
			thumbnails: {
			default: "https://i.ytimg.com/vi/ReyC9e3SP44/mqdefault.jpg"
			},
			published_at: "2016-12-08T09:27:32.000Z",
			video_description: "The time to fight is now! Watch this new promo from #RogueOne: A #StarWars Story, in cinemas December 16. Rogue One tells the story of how a group of ..."
			},
			old: false,
			alerted: true,
			video_id: "ReyC9e3SP44"
			};	
		
		Services.youtubeAlert({},function(err,res) { 
			res.youtube.push(d);
			res.youtube.push(d1);
             that.setState({
                    youtube: res.youtube,
                    currentVideo: res.youtube[0]
                    });   
         });
	},
	selectedVideo(e){   
		var idx = e.currentTarget.id;
		var node = document.getElementById(e.currentTarget.id);
		this.setState({
			currentVideo: this.state.youtube[idx],
			firstNode: -1
		});
		var i = 0;
		var childElem = node.parentElement.childNodes; 
		for(i; i< childElem.length; i++){ 
			childElem[i].style = {backgroundColor: '#f4f4f4', color: '#000'}; 
		} 
		node.style.backgroundColor = '#e71e62';
		node.style.color = '#fff';


	},
	toggleMoreVideo(){
		this.setState({
			showMoreVideo: this.state.showMoreVideo === true ? false : true,
			listExpand : this.state.showMoreVideo === true ? 'expand_more' : 'expand_less' 
		 });
	}, 
	render(){ 
		var self = this; 
		divStyle = this.state.showMoreVideo === true ? {height: "100%"} : {height: "35px", overflow: 'hidden'} ; 
		return(
			this.state.youtube == 0  ? null : (<div className="youtube-container">
				<div className='youtube-container'>
					<YoutubePlayer currentVideo = {this.state.currentVideo} />
				<div id='videoList' style={divStyle}>	
				{
					this.state.youtube.map(function(item, i){
						return(
						<div key={i} id={i} className='youtube-row' style={self.state.firstNode===i ? firstNodeStyle : null} onClick={(e) => self.selectedVideo(e)}>
							<div className='left youtube-row-icon'>
								<i className="material-icons">queue_music</i>
							</div>
							<div className='left youtube-row-text'>
							{item.meta.video_title.substring(0,40)}{item.meta.video_title.length > 40 ? '...':''}
							</div>  	
						</div>
						)
					})		
				}
				</div>
				<If test={(this.state.youtube.length > 1)} >
					<div className='center' onClick={this.toggleMoreVideo} ><i className="material-icons">{this.state.listExpand}</i>
					</div>
				</If>		
				</div> 

				</div>	
			)
				
				
		)
	}
}); 