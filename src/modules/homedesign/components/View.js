import React from 'react';
import { Link } from 'react-router';
import { If, ElseIf } from './../../utils/components';
export default React.createClass({
	getInitialState() {
     
      return {
        data: this.props.data|| {},
        type:this.props.type
      }
  },
  componentWillReceiveProps(props){
    this.setState({
      data: props.data|| {},
      type:props.type
    })
  },
	render(){
		var component=this;
		return(
		    <div className="card layout-one-card">
		        <div className="card-title primary-background">View {component.state.type}</div>
		        <div className="card-content">
		            <If test={component.state.type=="video"}>
                        <Video data={component.state.data} /> 
		            </If>
		            <If test={!(component.state.type=="video")}>
			             <div>
				          <div>
				            <label>Article Title</label>
				            <div className="blue-text text-darken-1" >{component.state.data.title}</div>
				          </div>
				          <div className="fieldSpace"></div>
				          <div>
				            <label>Article Slug</label>
				            <div className="blue-text text-darken-1" >{component.state.data.slug}</div>
				          </div>
				          <div className="fieldSpace"></div>

				          <If test={component.state.data.card_type==6 || component.state.data.card_type==2}>
		                     
		                         <div>
						            <label>Article Feature Image</label>
						            <div className="blue-text text-darken-1" >{component.state.data.feature_img}</div>
						          </div>
				          </If>
				          
				          <If test={component.state.data.card_type==7}>
		                     <div>
		                         <div>
						            <label>Article Desktop Feature Image</label>
						            <div className="blue-text text-darken-1" >{component.state.data.feature_img_desk}</div>
						          </div>
						          <div className="fieldSpace"></div>
						          <div>
						            <label>Article Mobile Feature Image</label>
						            <div className="blue-text text-darken-1" >{component.state.data.feature_img_mob}</div>
						          </div>
		                     </div>
				          </If>
				          <If test={component.state.data.card_type==5}>
		                     <div>
		                         <div>
						            <label>Article Feature Image</label>
						            <div className="blue-text text-darken-1" >{component.state.data.feature_img}</div>
						          </div>
						          <div className="fieldSpace"></div>
						          <div>
						            <label>Article Description</label>
						            <div className="blue-text text-darken-1" >{component.state.data.description}</div>
						          </div>
						          <div className="fieldSpace"></div>
						          <div>
						            <label>Article Card Title</label>
						            <div className="blue-text text-darken-1" >{component.state.data.topicTitle}</div>
						          </div>
						          <div className="fieldSpace"></div>
						          <div>
						            <label>Article Highlights</label>
						            <div className="blue-text text-darken-1" >{component.state.data.highlights}</div>
						          </div>
		                     </div>
				          </If>
				          <div className="fieldSpace"></div>
				          <div className="card-action primary-background white-text">
				              <Link to={'/homeDesign/edit/'+component.state.type}><button onClick={this.save} className="btn">Edit</button></Link>
				              <button onClick={this.desktopPreview} className="btn">Desktop Preview</button>
				              <button onClick={this.mobilePreview} className="btn">Mobile Preview</button>
				          </div>
			          </div>
			        </If>
		        </div>
            </div>
			)
	}
 
});
var Video=function(props){
	console.log(props.data);
  var List = props.data.map((item,i)=>
    <li key={i} className="collection-item">{item.title}</li>
    );
  return (  <div>
  	            <ul className="collection">{List}</ul>
  	            <div className="fieldSpace"></div>
		        <div className="card-action primary-background white-text">
		            <Link to={'/homeDesign/video/add'}><button className="btn">Add</button></Link>
		        </div>
  	        </div>)
}


