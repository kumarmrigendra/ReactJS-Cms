import React from 'react';
import { Link } from  'react-router';

export default React.createClass({
	getInitialState(){
		return {
      qtags:this.props.data
		}
	},
  componentWillReceiveProps(props){
    this.setState({
      qtags:props.data
    })
  },
  input(event){
         this.props.passBack('qtags',event.target.value);
  },
  render() {
    return (
      <div>
        <label>Qtags</label>
        <input placeholder="Enter QTag" type="text" value={this.state.qtags} onChange={this.input}/>
      </div>     
    )
  }
});



