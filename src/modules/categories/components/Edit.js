
import React from 'react';
import { Tags, EditableTags } from './../../utils/components';
import { If, ElseIf, Spinner } from './../../utils/components';
import { Link } from  'react-router';
import { save, create } from './../services';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
const USER=localUser.get();
const goBackUrl='/categories/';
export default React.createClass({
  defaultData: {
    "category_name": "",
    "category_display": "",
    "category_desc": "",
    "category_feature_img": "",
    "category_slug": "",
    "modified_date": "",
    "created_date": "",
    "redis_id": "",
    // "created_by": USER.info.username || '',
    // "modified_by": USER.info.username || '',
    // "userID": USER.info._id,
    "flag": 1,
    tags: []
  },
  getInitialState(){
    return {
      data:this.props.data || this.defaultData,
      create:(this.props.route && this.props.route.path=='create'),
      saving:false,
      slug_state:'unknown'
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
  save(){
    var self=this;
    self.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    var query={
      "catid": data._id.$oid,
      "catdata":data,
    }
    delete query.catdata._id;
    save(query,function(err,res) {
      self.setState({saving:false});
      if(err || res.status==0){
        toast.show(Toast.error);
        return;
      }
      toast.show(Toast.saved);
    })
  },
  validateCreate(){
     if(this.state.slug_state!='validated'){
       toast.show(Toast.invalidatedSlug);
       return false;
    }
  },
  create(){
    if(!this.validateCreate()) return;
    var self=this;
    self.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    var query={
      "catdata":data,
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
  cancel(){
    var url=this.state.create ? goBackUrl : goBackUrl + this.props.params.category;
    this.props.history.push(url);
  },
  remove(index){
    var data=this.state.data;
    data.tags.splice(index,1)
     this.setState({
      data
    })
  },
  validateSlug(){
    var Slug=this.state.data.category_slug;
    var self=this;
    slug(Slug,function(err,res){
      console.log(res)
       self.setState({
        slug_state:(err||res==1) ? 'invalidated' : 'validated'
       })
    })
  },
  input(e,key){
    var data=this.state.data;
    data[key]=e.target.value;
     this.setState({
      data,
      slug_state:(key=='category_slug') ? 'unknown' : this.state.slug_state
    })
  },
  render() {
    var data=this.state.data;
    return (
      <div className="card layout-one-card">
        <If test={this.state.create}>
          <div className="card-title primary-background white-text">Create category</div>
        </If>
        <If test={!this.state.create}>
          <div className="card-title primary-background white-text">Edit - <i>{data.category_slug}</i></div>
        </If>
        <Spinner show={this.state.saving}/>
        <div className={(this.state.saving ? 'saving ':'') + 'card-content' }>
          <div className="custom-input">
            <label>Title</label>
            <input type="text" value={data.category_name} onChange={(e)=>this.input(e,'category_name')}/>
          </div>
          <div className="custom-input">
            <label>Slug</label>
            <input type="text" disabled={!this.state.create} value={data.category_slug} onChange={(e)=>this.input(e,'category_slug')}/>
            <If test={this.state.create}>
                <button onClick={this.validateSlug} className={ this.state.slug_state  +' btn input-button'}> 
                  <i className="v material-icons">check</i>
                   <i className="iv material-icons">error outline</i>
                  <i className="un material-icons">refresh</i>
                  <span className="v">Validated</span>
                  <span className="iv">inValidated</span>
                  <span className="un">Validate</span>
                </button>
            </If>
          </div>
          <div className="custom-input">
            <label>Feature Image</label>
            <input type="text" value={data.category_feature_img} onChange={(e)=>this.input(e,'category_feature_img')}/>
          </div>

          <div className="custom-input">
            <label>Description</label>
            <input type="text" value={data.category_desc} onChange={(e)=>this.input(e,'category_desc')}/>
          </div>
              
             
          <div className="custom-input">
            <label>Tags</label>
            <EditableTags data={data.tags} add={this.add} remove={this.remove}/>
          </div>
        </div>
        <div className="card-action primary-background white-text">
          <If test={this.state.create}>
            <button onClick={this.create} className="btn">Create</button>
          </If>
          <If test={!this.state.create}>
            <button onClick={this.save} className="btn" disabled={this.state.saving}>Save</button>
          </If>
          <button onClick={this.cancel} className="btn">Cancel</button>
        </div>
      </div>
    )
  }
});