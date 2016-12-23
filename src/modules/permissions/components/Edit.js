
import React from 'react';
import { Tags, EditableTags } from './../../utils/components';
import { If, ElseIf, Spinner } from './../../utils/components';
import { Link } from  'react-router';
import { default as Add } from './Add';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import { create, save } from './../services'
export default React.createClass({
  defaultData:{
    permname:null,
  },
  getInitialState(){
    return {
      data:this.props.data || this.defaultData,
      create:(this.props.route && this.props.route.path=='create'),
      newPermission:false,
      searchString:'',
      saving:false
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
  add(tag){
    var data=this.state.data;
    data.tags.push(tag);
    this.setState({
      data
    })
  },
  remove(index){
    var data=this.state.data;
    data.tags.splice(index,1)
     this.setState({
      data
    })
  },
  input(e,key){
    var data=this.state.data;
    data[key]=e.target.value;
    this.setState({
      data
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
    var data=this.state.data;
    data[perm]=0;
    this.setState({
      data
    })
  },
   create(){
 //   if(!this.validateCreate()) return;
    var self=this;
    self.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    var query={
      data
    }
    create(query,function(err,res) {
      self.setState({saving:false});
      if(err || res.status==0){
        toast.show(Toast.error);
        return;
      }
      toast.show(Toast.created);
    })
  },
  save(){
 //   if(!this.validateCreate()) return;
    var self=this;
    self.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
  
    var query={
      data,
      permid:data._id
    }
    delete data._id;
    save(query,function(err,res) {
      self.setState({saving:false});
      if(err || res.status==0){
        toast.show(Toast.error);
        return;
      }
      toast.show(Toast.saved);
    })
  },
  toggle(e,item){
    console.log(e.target.checked,item);
      var data=this.state.data;
      data[item]= (e.target.checked) ? 1 : 0;

    this.setState({
      data
    })
  
  },
   listSearch(e) {
    var str = e.target.value;
    this.setState({
      searchString: str
    })
  },
  render() {
    var data=this.state.data;
    var self=this;
     var Perms=Object.keys(data).map(function(item, index) {
          var perm=self.state.data[item];
          if(perm!=0 && perm !=1) return null;
          if (item.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim()) < 0) {
            return null;
          }
          return(
          <div className="switch col m4 ">
           <div className="card">
              <div className="card-content">
                <label>{item}</label>
                <div className="remove"><i className="material-icons">close</i></div>
                <label className="right">
                  <input checked={perm==1} type="checkbox" onChange={(e)=> self.toggle(e,item)}/>
                  <span className="lever"></span>
                </label>
              </div>
            </div>
        </div>
        );
    })
    return (
          <div className={(this.state.saving ? 'loading ' : '') + "card layout-one-card"}>
             <If test={this.state.create}>
                <div className="card-title">Create </div>
              </If>
              <If test={!this.state.create}>
                <div className="card-title">Edit - <i>{data.permname}</i></div>
              </If>
              <Spinner show={this.state.saving}/>
            <div className="card-content">
              <div className="entity">
                <label>Permission group name</label>
                <input type="text" value={data.permname} onChange={(e)=>this.input(e,'permname')}/>
              </div>
            <div className="row">
               <div className="col m4 search-card">
                 <div className="card">
                  <div className="card-content white-text yellow darken-2">
                    <input type="text" placeholder="Permission name" onChange={this.listSearch}/>
                  </div>
                  
                  </div>
              </div>
              <div className="col m4 add-permission" onClick={this.openAddPermission}>
                 <div className="card">
                    <div className="card-content white-text yellow darken-2">
                      <span>Add new permission</span>
                    </div>
                  </div>
                    <Add test={this.state.newPermission} close={this.closeAddPermission} add={this.addPermission}/>
              </div>
               {Perms}
             </div>
            </div>
            <div className="card-action primary-background white-text">
              <If test={this.state.create}>
                <button disabled={this.state.saving} onClick={this.create} className="btn">Create</button>
               </If>
               <If test={!this.state.create}>
              <button disabled={this.state.saving} className="btn" onClick={this.save}>Save</button>
               </If>
            </div>
          </div>
    

        
    )
  }
});