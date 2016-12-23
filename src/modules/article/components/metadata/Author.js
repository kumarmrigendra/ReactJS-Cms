import React from 'react';
import { Link } from  'react-router';
export default React.createClass({
	getInitialState(){
		return {
		  author:this.props.author
    }
	},
  componentWillReceiveProps(props){
    this.setState({
      author:props.author
    });
  },
  render() {
    return (
      <div>
        <div>
          <label>Author</label>
          <input placeholder="Enter Author" type="text" value={this.state.author.display_name} />
        </div>
        <div>
          <label>CoAuthor</label>
          <input placeholder="Enter CoAuthor" type="text" value={this.state.author.auth_display} />
        </div>
      </div>

    )
  }
});
