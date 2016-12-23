import React from 'react';
import { Link} from 'react-router';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || {}
    }
  },
  input(event,key){
    var data=this.state.data;
    data[key]=event.target.value;
    this.setState({
      data
    })
  },
  // shouldComponentUpdate(){
  //   return true
  // },
  create(){
     var data=JSON.parse(JSON.stringify(this.state.data))
    this.props.create(data);
  },
  cancel(){
    this.props.done()
  },
  render() {
    return (
        <div className="card">
          <div className="card-content">
            <div className="card-title">New Trending Tag</div>
            <div className="row">
              <div className="col s6">
                <label>Tag</label>
                <input type="text" onChange={(event) => this.input(event,'tag')} / >
              </div>
              <div className="col s6">
                <label>Slug</label>
                <input type="text" onChange={(event) => this.input(event,'slug')} / >
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn" onClick={this.create}>create</button>
            <button className="btn" onClick={this.cancel}>Cancel</button>
          </div>
        </div>
    )
  } 
});

