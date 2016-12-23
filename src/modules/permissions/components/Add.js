import React from 'react';
import { Link } from  'react-router';
import { Spinner } from './../../utils/components';
export default React.createClass({

  getInitialState(){
    return {
      spinner:false
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      
    })
  },
  add(e){
  	var self=this;
  	if(this.state.spinner) return;
  	setTimeout(function() {
  		self.setState({
  			spinner:false
  		})
  	},2000)
  	this.setState({
  		spinner:true
  	});
  	e.preventDefault();
  	e.stopPropagation();

  	this.props.add(this.input.value);
  },
  cancel(e){
  	if(this.state.spinner) return;
  	e.preventDefault();
  	e.stopPropagation();
   this.props.close();
  },
  render() {
  	if(!this.props.test) return null;
    return (

          <div className={(this.state.spinner ? 'loading ':'' )+ 'card input-container'}>
                     <Spinner show={this.state.spinner} />
                      <div className="card-content white-text yellow darken-2">
                        <input className="" type="text" placeholder="Permission name" ref={(input) => { this.input = input; }}/>
                        <button disabled={this.state.spinner} className="btn" onClick={this.add}><i className="material-icons">check</i></button>
                         <button disabled={this.state.spinner} className="btn" onClick={this.cancel}><i className="material-icons">close</i></button>
                      </div>
               </div>

        
    )
  }
});