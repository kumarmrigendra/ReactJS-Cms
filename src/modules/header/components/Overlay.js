import React from 'react';
import { Link } from  'react-router';
export default React.createClass({
	getInitialState(){
		return {
//			status:this.props.status
		}
	},
	overlayTap(){
		console.log('overlayTap')
		if(this.props.click){
			this.props.click();
		}
	},
	componentDidMount(){
		this.overlay.className='overlay fadeIn'
	},
  	render() {
  		var statusClass='';//this.state.status ? ' ' : 'hidden';
    	var overlayStyle={

    	}
    	if(this.props.color){
    		overlayStyle.background=this.props.color;
    	}
    	return (
           <div className={statusClass + ' overlay'} style={overlayStyle} id="main-overlay"  ref={(el) => this.overlay = el} onClick={this.overlayTap}></div>
        
     
    )
  }
});