import React from 'react';
import { Link } from  'react-router';
export default React.createClass({
	getInitialState(){
    return {
      extraData:this.props.extraData,
      status:this.props.status || false,
      view:this.props.view || 'none'
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      status:props.status,
      view:props.view,
      extraData:props.extraData
    })
  },
  render() {
    if(!this.state.status) { return null; }
    return (
       	<div>
          <div className="card-panel">
            <label className="block-element">Actions</label>
            <button className="btn" onClick={this.props.draft}>Save Draft</button>
            <button className="btn" onClick={this.props.publish}>Publish</button>
            <button className="btn">Schdule</button>
            {
             ( this.state.extraData.state != 'published') ? null :(<button className="btn">Update</button>
              ) 
              
            }
          </div> 
        </div>
    )
  }
});



