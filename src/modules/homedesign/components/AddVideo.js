import React from 'react';
import { Link, browserHistory } from 'react-router';
import { If } from './../../utils/components';
import { postHomepageData } from './../services';
import { toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
	getInitialState() {
	    return {
	        form:{
              'title':'',
              'link':'',
              'feature_img':''
	        },
	        type:this.props.type
	    }
    },
    componentWillReceiveProps(props){
	    this.setState({
	      type:props.type
	    })
    },
    input(event,key){
	    var form=this.state.form;
	    var value=event.target.value;
	    form[key]=value;
	    this.setState({
	      form
	    })
    },
    handleClick(){
        var self=this;
        console.log(self.state.form)
        var form=self.state.form;
        form['type']=self.state.type
        postHomepageData({ data:form }, (err, res) => {
	      if(res.status==0 || err){
	        toast.show(Toast.error);
	      }
	      if (res.status==1){
	        toast.show(Toast.created);
	        browserHistory.push('/homeDesign/');  
	      }
	    })
    },
	render(){
		var component=this;
		// console.log(component.state.data)
		return(
		    <div className="card layout-one-card">
		        <div className="card-title primary-background">Add Video</div>
		        <div className="card-content">
                    <div className="row">
		                <div className="input-field">
		                    <input id="title" onChange={(event)=> component.input(event,'title')}/>
                            <label className="active" htmlFor="title">Article Title</label>
		                </div>
		                <div className="input-field">
		                    <input id="link" onChange={(event)=> component.input(event,'link')}/>
                            <label className="active" htmlFor="link">Video Link</label>
		                </div>
		                <div className="input-field">
		                    <input id="feature_img" onChange={(event)=> component.input(event,'feature_img')}/>
                            <label className="active" htmlFor="feature_img">Article Feature Image</label>
		                </div>
	                </div> 
	                <button onClick={this.handleClick} className="btn">Submit</button>
		        </div>
            </div>
		)
	}
});
