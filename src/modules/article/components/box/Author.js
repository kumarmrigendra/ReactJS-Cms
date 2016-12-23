import React from 'react';
import { Link } from  'react-router';
import { getAll } from './../../../users/services';
var Select=require('react-select');
export default React.createClass({
	getInitialState(){
		return {
		  data:this.props.data,
    }
	},
  componentWillReceiveProps(props){
    this.setState({
      data:props.data,

    });
  },
  componentWillMount(){
    var self=this;
    getAll({},self.setOptions)
  },
  setOptions(err,res){
    var data=res.data;
    var options=[];
    this.setState({
      options:res.data
    })
  },
  change(val){
    console.log(val);
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.author=val;

    this.props.passBack(data);
  },
  addCoauthor(val){
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.co_author=val;//.push(val);
    this.props.passBack(data);
  },
  render() {
    var selected=this.state.data.author;
    var co_authors=this.state.data.co_author;
    return (
      <div>
        <div>
            <label>Publishing as:</label>
           <Select
            name="form-field-name"
            value={selected}
            onChange={this.change}
            labelKey='display_name'
            valueKey='username'
            options={this.state.options}
        />
        </div>
        <div>
          <label>CoAuthor</label>
          <Select
            multi={true}
            name="form-field-name"
            value={co_authors}
            labelKey='display_name'
            valueKey='username'
            onChange={this.addCoauthor}
            options={this.state.options}
          />
        </div>
      </div>

    )
  }
});
