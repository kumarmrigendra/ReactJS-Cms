import React from 'react';

export default React.createClass({
	getInitialState(){
		return{
			percentage: this.props.percentage,
		}
	},
	componentWillReceiveProps(props){
		// console.log(props);
		// this.setState({
		// 	percentage: props.percentage 
		// })
	},
	render(){  
		var perVal = this.props.percentage * 3.6;
		var perColor = '';
		if(perVal < 0){
			perColor = '#ff8181'; 
		}else if(perVal > 0){
			perColor = '#39B4CC';
		}else{
			perColor = '#ffffb4';
		}
		var divStyle = {};
		if(perVal <= 180){
			divStyle = {
	      	backgroundImage:
	        	'linear-gradient('+(90+perVal)+'deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)',
	      	backgroundColor: perColor  
	    };
		}else
		{
			divStyle = {
	      		backgroundImage:
			        'linear-gradient('+(perVal-90)+'deg, transparent 50%, #39B4CC 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)',
			    backgroundColor: perColor  
	    };	
		}
		
		return(
			<div className="circleContainer">
			    <div id="activeBorder" style={divStyle} className="active-border" >
			        <div id="circle" className="circle">
			            <span className="prec" id="prec">{this.props.percentage}%</span>
			        </div>
			    </div>
			</div>
		)
	}	
})

