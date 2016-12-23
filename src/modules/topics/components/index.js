import React from 'react';
import { Link } from 'react-router';
import { If, ElseIf } from './../../utils/components';
import { getData} from './../services';
export default React.createClass({
  getInitialState() {
    return {
      data: [],
      searchString: ''
    }
  },
  componentWillMount() {
    var self = this;
    getData({}, function(err, res) {
      self.setState({
        data: res.data
      })
    })
  },
  getData(params) {
    if (params.topic) {
      return this.findBySlug(params.topic)
    }
  },
  findBySlug(slug) {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].topic_slug == slug)
        return this.state.data[i];
    }
    return {};
  },
 listSearch(e) {
    var str = e.target.value;
    this.setState({
      searchString: str
    })
  },
  render() {
    var self = this,
    		children=null;
    if (this.state.data.length < 1) return null;
    var List = this.state.data.map(function(topic) {
      if (topic.topic_slug.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim()) < 0) {
        return null;
      }
      return (<li>
	  		 <Link activeClassName="active" to={'/topics/' + topic.topic_slug}>
	  		 	{topic.topic_slug}
	  		 </Link>
  		 </li>)
    });
    if (this.props.children) {
      children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, {
          data: self.getData(child.props.params)
        })
      })
    }
    return (
      <div className="row layout-one" id="topic-wrapper">
	      	<div className="col m3 layout-one-sidebar ">
			     <div className="top-actions">
			     	<div className="header">
			     		<h5>Topics</h5>
			     	</div>
			     	<div id="add-wrapper">
			     		<Link to="/topics/create" id="add-button">
			      		<i className="material-icons">add</i>
			      		New Topic
			     		</Link>
			     	</div>
			     	<div className="search">
			     		<i className="material-icons">search</i>
			     		<input placeholder="Search Topics" value={this.searchString} onChange={this.listSearch}/>
			     	</div>
			     </div>
      	  	<ul ref={(link) => { this.sidebarList = link; }}>
			   		 	  {List}
		      	</ul>
					</div>
	      	<If test={this.props.children} >
		      	<div className="col offset-m3 m9 layout-one-content" >
		      		{children}
		      	</div>
	      	</If>
      </div>
    )
  }
});
