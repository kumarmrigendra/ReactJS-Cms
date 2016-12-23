import React from 'react';
import { Link } from 'react-router';
import { If, ElseIf } from './../../utils/components';
import { getData } from './../services';
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
    if (params.category) {
      return this.findBySlug(params.category)
    }
  },
  findBySlug(slug) {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].category_slug == slug)
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
    var List = this.state.data.map(function(category) {
      if (category.category_slug.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim()) < 0) {
        return null;
      }
      return (<li className="">
	  		 <Link activeClassName="active" to={'/categories/' + category.category_slug}>
	  		 	{category.category_slug}
	  		 </Link>
  		 </li>)
    });
    if (this.props.children) {
      children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, {
          data: self.getData(child.props.params),
        })
      })
    }
    return (
      <div className="row layout-one" id="category-wrapper">
	      	<div className="col m3 layout-one-sidebar ">
			     <div className="top-actions">
			     	<div className="header">
			     		<h5>Categories</h5>
			     	</div>
			     	<div id="add-wrapper">
			     		<Link to="/categories/create" id="add-button">
			      		<i className="material-icons">add</i>
			      		New Category
			     		</Link>
			     	</div>
			     	<div className="search">
			     		<i className="material-icons">search</i>
			     		<input placeholder="Search Categories" value={this.searchString} onChange={this.listSearch}/>
			     	</div>
			     </div>
      	  	<ul ref={(link) => { this.sidebarList = link; }}>
			   		 	  {List}
		      	</ul>
					</div>
	      	<If test={this.props.children} >
		      	<div className="col m9 offset-m3 layout-one-content" >
		      		{children}
		      	</div>
	      	</If>
      </div>
    )
  }
});
