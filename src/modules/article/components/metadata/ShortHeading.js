import React from 'react';
import { Link } from  'react-router';

export default React.createClass({
	getInitialState(){
		return {
		short_heading:this.props.short_heading
		}
	},
  componentWillReceiveProps(props){
    this.setState({
      short_heading:props.short_heading
    })
  },
  input(event){
         this.props.passBack('short_heading',event.target.value);
  },
  render() {
    var component=this;
    return (
      <div>
        <label>Short Heading</label>
        <textarea placeholder="Short Heading" className="materialize-textarea" value={this.state.short_heading} onChange={this.input}></textarea>
      </div>
           
    )
  }
});



