import React from 'react';
import { default as OPTIONS } from './../stub/DesignOptions';
export default React.createClass({
	getInitialState(){
		return {
			selected:this.props.design || [1,0,0],
			status:this.props.status || false
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			status:props.status,
			selected:props.design
		})
	},
	select(index){
		var selected=this.state.selected.slice();
		if(index==0){
			selected=[1,0,0]
		}else{

			selected[index]=((selected[index]==1) ? 0 : 1);
			if(!selected[1] && !selected[2]){
				selected[0]=1;
			}else{
			
				selected[0]=0;
			}
		}
		this.props.passBack(selected);
		// this.setState({
		// 	selected
		// })
	},
  render() {
  	if(!this.state.status){ return null; }
  	var self=this;
    return (
   			<div className="design-options">
   				<div>
   				<label>Design Options</label>
          </div>
          {
          	OPTIONS.map(function(item,index) {
          		return (
        				 <div key={index} className={((self.state.selected[index]==1) ? 'selected ' : '' )+ 'chip' } onClick={() => self.select(index)}>
							 	   {item}
								</div>
        			)
          	})
          }
	   				
        </div>
    )
  }
});



