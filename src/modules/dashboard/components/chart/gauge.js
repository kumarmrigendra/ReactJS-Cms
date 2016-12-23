import React from 'react';
import { If } from './../../../utils/components';

let divStyle = {};

export default React.createClass({
	getInitialState(){
		return {
			percentage: this.props.percentage || {},
			displayName: this.props.displayName || '',
		}
	},
	componentWillReceiveProps(props){
		console.log(props.percentage);
		this.setState({
			percentage: props.percentage
		})
	},
	render(){
		var percent = this.state.percentage * 1.8;
		divStyle= {transform: 'rotate('+percent+'deg) translate3d(0, 0, 0)'};
		return(this.state.percentage == 0  ? null : (
			<If test={this.state.percentage>0}>
				<section className="gauge-content">
				<h5 className='semi-circle-text center'>{this.state.displayName}</h5>
				  <div className="box gauge--1">
				    <div className="mask">
				    	<div className="semi-circle"></div>
				    	<div className="semi-circle--mask" style={divStyle}></div>
				    </div>
				  </div>
				  <p className='semi-circle-percentage center'>{this.state.percentage}%</p>
				</section>

			</If>	
			)
			)
	}
})