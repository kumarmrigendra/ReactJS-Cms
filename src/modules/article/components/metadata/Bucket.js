import React from 'react';
import { Link } from  'react-router';
import { bucketList } from './../../stub';
var Select=require('react-select');
export default React.createClass({
	getInitialState(){
		
    return {
      options: bucketList,
      selected:this.props.data
		}
	},
    componentWillReceiveProps(props){
        this.setState({
            selected:props.data || null
        })
    },
    change(val){
       this.props.passBack('bucket',val);
  },
  render() {
    return (
        <div className="margin-bottom">
            <label>Bucket</label>
            <Select
            name="form-field-name"
            value={this.state.selected}
            onChange={this.change}
            options={this.state.options}
        />
       </div>  
    )
  }
});
