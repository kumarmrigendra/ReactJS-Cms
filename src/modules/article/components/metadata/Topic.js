import React from 'react';
import { Link } from  'react-router';
import { search } from './../../../topics/services';
var Select = require('react-select');
import { Creatable } from 'react-select';

export default React.createClass({
	getInitialState(){
		return {
		  options : [],
      selected:this.props.data || null
		}
	},
  componentWillReceiveProps(props){
    this.setState({
      selected:props.data || null
    })
  },
  change(val){
    this.props.passBack('topic',val);
  },
  getOptions(input,calllback){
    if(input.trim().length<1){
      return calllback(null,{options:[]})
    }
    var self=this;
    search({topicname:input},function(err,res){
       var options=format(res.data);
        self.setState({
          options
        })
        calllback(null,{options,complete: true});
    })
  },
  render() {
    return (
      <div>
        <label>Topic</label>
        <Select.Async
            name="form-field-name"
            value={this.state.selected}
            onChange={this.change}
            loadOptions={this.getOptions}
        />
      </div>
    )
  }
});

var format=function(topics){
  var arr=[];
  for(var i=0;i<topics.length;i++){
    arr.push({
      value:topics[i].topic_slug,
      label:topics[i].topic_name
    })
  }
  return arr;
}

