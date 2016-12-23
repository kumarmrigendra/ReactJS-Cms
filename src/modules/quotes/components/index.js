import React from 'react';
import { Link } from  'react-router';
import { If, ElseIf } from './../../utils/components';
import { quotesManagement, getQuote } from './../services';
import {localUser, toast} from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
	getInitialState(){
		return {
			data:[]
		}
	},
	componentWillMount(){
		var that=this;
		getQuote({},function(err,res) {
			that.setState({
				data:res.data
			})
		});
	},
  input(event,key){
    var data=this.state.data;
    var value=event.target.value;
    data[key]=value;
    this.setState({
      data
    })
  },
  handleSubmit(){
    var user=localUser.get();
    var data=this.state.data;
    delete data.pubon
    delete data.pub_by
    quotesManagement({qdata:data}, (err, res) => {
      if (res.status==1){
        toast.show(Toast.saved);
        setTimeout(function(){
        window.open("/dashboard",'_self');
        },2000); 
      }
      if(res.status==0 || err){
         toast.show(Toast.error);
      }
    }) 
  },   
  render() {
  	var self=this; 	
    return (
      <div className="row">
        <div className="col l6">
          <div className="card">
            <h4 className="col l12 blue-text text-darken-2">Quotes Management</h4>
            <div className="col l12"><br/> <br/></div>
            <div className="input-field col l12">
              <textarea className="materialize-textarea" value={self.state.data.quote} onChange={(event)=> this.input(event,'quote')} id="quote" />
              <label className="active" htmlFor="quote">Quote</label>
            </div>
            <div className="input-field col l12">
              <textarea className="materialize-textarea" value={self.state.data.description} onChange={(event)=> this.input(event,'description')} id="description" />
              <label className="active" htmlFor="description">Quote Description</label>
            </div>   
            <button className="btn" type="submit" onClick = { this.handleSubmit }>Save
              <i className="material-icons right">send</i>
            </button>
            <Link to ="" ><div className="waves-effect waves-light btn">Cancel</div></Link>
          </div>
        </div>                
      </div>
    )
  }
});