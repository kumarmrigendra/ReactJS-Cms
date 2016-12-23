import React from 'react';
import { Link } from  'react-router';
import { default as Category } from './Category';
import { default as Tags } from './Tags';
import { default as QTags } from './QTags';
import { default as Bucket } from './Bucket';
import { default as Author } from './Author';
import { default as FeatureImage } from './FeatureImage';
import { default as ShortHeading } from './ShortHeading';
import { default as Topic } from './Topic';
import { default as Extra } from './Extra';
export default React.createClass({
	getInitialState(){
		return {
			status:this.props.status,
      metadata:this.props.metadata	
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			status:props.status,
      metadata:props.metadata
		})
	},
  dataInput(key,data){
    var metadata=JSON.parse(JSON.stringify(this.state.metadata));
    metadata[key]=data;
    this.props.metaDataUpdate(metadata);
  },
  render() {
  	if(!this.state.status){
  		return null;
  	}
    return (

   		<div className="row" id="metadata">
   			<div className="col s6">
   				<div className="card-panel">
     				<Extra passBack={ this.dataInput } data={ this.state.metadata.extra } />
   				</div>

   				<div className="card-panel">
  					 <ShortHeading passBack={ this.dataInput } short_heading={ this.state.metadata.short_heading }/>
   				</div>

   				<div className="card-panel">
    				<Tags passBack={ this.dataInput } data={ this.state.metadata.tags } />
    			  <QTags passBack={ this.dataInput } data={ this.state.metadata.qtags }/>
        	</div>

        	
   			</div>

   			<div className="col s6">
   				<div className="card-panel">
   					<FeatureImage passBack={this.dataInput} data={ this.state.metadata.feature_image }/>
   				</div>
          <div className="card-panel">
            <Topic passBack={ this.dataInput } data={ this.state.metadata.topic } />
            <Bucket passBack={ this.dataInput } data={ this.state.metadata.bucket } />
            <Category passBack={ this.dataInput } data={ this.state.metadata.category } />
          </div>
   			</div>
      </div>    
           
    )
  }
});



