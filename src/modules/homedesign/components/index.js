import React from 'react';
import { Link } from 'react-router';
import { If, ElseIf } from './../../utils/components';
import { getHomepageData,getTrendingData } from './../services/';
export default React.createClass({
    getInitialState(){
	    return {
	      data:null,
	      designTypeData:null,
	      trending:[],
	      type:null
	    }
    },
    componentWillMount(){
        var self=this;
	    getHomepageData({"category":"homepage"},function(err,res){
	      getTrendingData({},function(err,res2){
	         self.setState({
	          data:res.data,
	          trending:res2.data
	         })
	      });
	    })
    },
    designTypeName(e){
    	var self=this;
    	var key=e.target.id
    		 this.setState({
                designTypeData:self.state.data[key],
                type:key
    		})
    },

    render(){
    	if(!this.state.data){
    		return null;
    	}
		var self=this;
		var DesignTypes=Object.keys(this.state.data);
		
		var List=DesignTypes.map(function(design,i){
			return(
                   <li key={i}><Link activeClassName="active" to={'/homeDesign/' + design} id={design} onClick={self.designTypeName}>
                       {design}
                   </Link></li>
				)
		});
		var children=null;
	  	if (this.props.children) {
	      children = React.Children.map(this.props.children, function(child) {
	        
	        return React.cloneElement(child, {
	          data:self.state.designTypeData,
	          type:self.state.type,
	          trending:self.state.trending,
	          search:self.props.search
	        })
	      })
	    }
		return(
			<div className="row layout-one" id="category-wrapper">
	      	<div className="col m3 layout-one-sidebar ">
			     <div className="top-actions">
			     	<div className="header">
			     		<h5>Homepage Designs</h5>
			     	</div>
			    </div>
		     	<ul>
		     		{List}
		     		<li><Link activeClassName="active" to='/homeDesign/article/trending'>
                       Trending
                    </Link></li>
		     	</ul>
			     
			</div>
	      	<If test={children} >
		      	<div className="col m9 offset-m3 layout-one-content" >
		      		{children}
		      	</div>
	      	</If>
		      		
      </div>
			)
	}
});


 