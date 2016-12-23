import React from 'react';
import { Link } from  'react-router';
import { If, ElseIf, Spinner } from './../../utils/components';
import { getGroups, getAll } from './../services';
export default React.createClass({
	getInitialState(){
		return {
			data:[],
      groupname:'',
      allUsersData:[],
      searchString:'',
      spinner:false
		}
	},
	componentWillMount(){
		var that=this;
    this.setState({ spinner:true });
		getGroups({},function (err,res) {
		  getAll({},function(err,resp) {
        that.setState({
          allUsersData:resp.data,
          data:res.data,
          spinner: false
        }); 
      });
		});
    
	},
	getData(params){
		if(params.groupname){
			return this.findBySlug(params.groupname)
		}
	},
	findBySlug(groupname){
		for(var i=0;i<this.state.data.length;i++){
  		if(this.state.data[i].groupname==groupname){
				return this.state.data[i];
      }
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
  	var self=this;	
  	var children=null;
  	if(this.props.children){
      children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
         	data:self.getData(child.props.params),
          allUsersData:self.state.allUsersData
        })
      })
  	}
    var List = this.state.data.map(function(group,i) {
      if (group.groupname.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim()) < 0) {
        return null;
      }
      return (
        <li className="" key={i}>
          <Link activeClassName="active" to={'/groups/' + group.groupname}>
          {group.groupname}
          </Link>
       </li>
      )
    });
    return (
      <div className="row layout-one" id="category-wrapper">
        <div className="col m3 layout-one-sidebar ">
          <div className="top-actions">
            <div className="header">
              <h5>Groups</h5>
            </div>
            <div id="add-wrapper">
              <Link to="/groups/create" id="add-button">
                <i className="material-icons">add</i>
                New group
              </Link>
            </div>
            <div className="search">
              <i className="material-icons">search</i>
              <input placeholder="Search Groups" value={this.searchString} onChange={this.listSearch}/>
            </div>
          </div>
          <If test={this.state.spinner}>
            <div className='allUserSpinnerContainer'> 
              <Spinner show='true'/>
             </div>
          </If>
          <ul ref={(link) => { this.sidebarList = link; }}>
            {List}         
          </ul>
        </div>
        <If test={this.props.children}>
          <div className="col m9 offset-m3 layout-one-content" >
            {children}
          </div>
        </If>
      </div>
    )
  }
});