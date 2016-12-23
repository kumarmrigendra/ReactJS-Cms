
import React from 'react';
import { Tags, EditableTags } from './../../utils/components';
import { If, ElseIf, Spinner } from './../../utils/components';
import { Link } from  'react-router';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import { save,create } from './../services';
import { default as defaultData } from './../stub/defaultData'
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || defaultData,
      create:(this.props.route && this.props.route.path=='create'),
      slug_state:'unknown'
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data || defaultData,
       create:(props.route && props.route.path=='create'),
       slug_state:'unknown'
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

    validateSlug(){
    var Slug=this.state.data.topic_slug;
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
      slug_state:(key=='topic_slug') ? 'unknown' : this.state.slug_state
    })
    
   
  },
  save(){
    var self=this;
    this.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    var query={
      "topicid": data._id.$oid,
      "topicdata":JSON.parse(JSON.stringify(data)),
    }
    delete query.topicdata._id;
    save(query,function(err,res) {
      self.setState({saving:false});  
      if(err || res.status==0){
        toast.show(Toast.error);
      }
      self.setState({saving:false,data});
      toast.show(Toast.articleFeatured);
    })
  },
  validateCreate(){
     if(this.state.slug_state!='validated'){
       toast.show(Toast.invalidatedSlug);
       return false;
    }
    return true;
  },
  create(){
    console.log('a');
    if(!this.validateCreate()) return;
    var self=this;
    console.log('c')
    self.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    var query={
      "topicdata":data,
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
  render() {

    var data=this.state.data;
    console.log(this.state.data)
    return (
          <div className={(this.state.saving ? 'loading ' : '')+'card layout-one-card'}>
             <If test={this.state.create}>
                <div className="card-title">Create topic</div>
              </If>
              <If test={!this.state.create}>
                <div className="card-title">Edit - <i>{data.topic_slug}</i></div>
              </If>
            <Spinner show={this.state.saving}/>
            <div className="card-content">

              <div className="">
                <label>Title</label>
                <input type="text" value={data.topic_name} onChange={(e)=>this.input(e,'topic_name')}/>
              </div>
            
              <div className="custom-input">
                <label>Slug</label>
                <input type="text" disabled={!this.state.create} value={data.topic_slug} onChange={(e)=>this.input(e,'topic_slug')}/>
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

              <div className="">
                <label>Feature Image</label>
                <input type="text" value={data.topic_feature_img} onChange={(e)=>this.input(e,'topic_feature_img')}/>
              </div>

               <div className="">
                <label>Description</label>
                <input type="text" value={data.topic_desc} onChange={(e)=>this.input(e,'topic_desc')}/>
              </div>
              
             
              <div className="">
                <label>Tags</label>
                <EditableTags data={data.tags} add={this.add} remove={this.remove}/>
              </div>
            </div>
            <div className="card-action primary-background white-text">
              <If test={this.state.create}>
              <button disabled={this.state.saving} onClick={this.create} className="btn">Create</button>
               </If>
               <If test={!this.state.create}>
              <button disabled={this.state.saving} onClick={this.save} className="btn">Save</button>
               </If>
            </div>
          </div>
    

        
    )
  }
});