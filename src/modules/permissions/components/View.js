import React from 'react';
import { If, Tags } from './../../utils/components';
import { Link } from  'react-router';
import { default as  list } from './../stub/list';
import { default as Add } from './Add';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || [],
      searchString:'',
      newPermission:false
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
    listSearch(e) {
    var str = e.target.value;
    this.setState({
      searchString: str
    })
  },
  openAddPermission(){
    this.setState({
      newPermission:true
    })
  },
  closeAddPermission(){
    this.setState({
      newPermission:false
    })
  },
  addPermission(perm){
    var data= JSON.parse(JSON.stringify(this.state.data));
    data[perm]=0;
    this.setState({
      data,
      newPermission:false
    })
  },
  render() {
    var data=this.state.data,
    self=this;
        var Perms=Object.keys(data).map(function(item, index) {
          var perm=self.state.data[item];

          if(perm!=0 && perm !=1) return null;
          var selected=(perm==1);
          if (item.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim()) < 0) {
            return null;
          }
          return(
          <div className={(selected ?'selected ' : '') + "col m4" }>
           <div className="card">
              <div className="card-content">
                <label>{item}</label>
              </div>
            </div>
        </div>
        );
    })
    return (
    
          <div className="card layout-one-card">
            <div className="card-title">{data.permname}</div>
            <div className="card-content">
            <div className="row">
              <div className="col m4 search-card">
                 <div className="card">
                  <div className="card-content white-text yellow darken-2">
                    <input type="text" placeholder="Permission name" onChange={this.listSearch}/>
                  </div>
                  
                  </div>
              </div>
              
               {Perms}
            </div>
             
             
            </div>
            <div className="card-action primary-background white-text">
               <Link className="btn" to={'/permissions/'+data.permname+'/edit'}>
                Edit
               </Link>
            </div>
          </div>
    

        
    )
  }
});