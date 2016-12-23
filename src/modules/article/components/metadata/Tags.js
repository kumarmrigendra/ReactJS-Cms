import React from 'react';
import { Link } from  'react-router';
import { EditableTags } from './../../../utils/components';

export default React.createClass({
	getInitialState(){
		return {
		  data:this.props.data || []
		}
	},
  componentWillReceiveProps(props){
    this.setState({
      data:props.data || []
    })
  },
  add(tag){
    var data=this.state.data.slice();
    data.push(tag);
    this.props.passBack('tags',data);
  },
  render() {
    return (
        <div>
          <label>Tags</label>
          <EditableTags data={this.state.data.slice()} add={this.add}/>
        </div> 
    )
  }
});



