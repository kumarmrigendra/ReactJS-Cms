
import React from 'react';
import { Tags, EditableTags } from './../../utils/components';
import { If, ElseIf, Spinner } from './../../utils/components';
import { Link } from  'react-router';
import { save } from './../services';
import { toast, localUser, slug } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
  defaultData:{
    tags:[],
    articles:[],
    featured_articles:[]
  },
  getInitialState(){
    return {
      data:this.props.data || this.defaultData,
      searchString:'',
      saving:false
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
  input(e,key){
    var data=this.state.data;
    data[key]=e.target.value;
    this.setState({
      data
    })
  },
  search(e){
    var str=e.target.value;
    this.setState({
      searchString:str
    })
  },
  removeSelected(){
   var els= document.querySelectorAll('.selected');
   for(var i=0;i<els.length;i++){
    els[i].className=els[i].className.replace('selected','');
   }
  },
  selected(e){
    this.removeSelected()
    e.target.className=e.target.className + ' selected';
  },
  feature(e,article){
    var self=this;
    e.preventDefault(); // Let's stop this event.
    e.stopPropagation(); // Really this time.
    this.setState({saving:true});
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.featured_articles=[article];
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
  isFeatured(id){
    var featured_articles=this.state.data.featured_articles || [];
    for(var i=0;i<featured_articles.length;i++){
      if(featured_articles[i].article_id==id){
        return true;
      }
    }
    return false;
  },
  render() {

    var data=this.state.data;
    var self=this;
     var Articles=data.articles.map(function(article) {
       if(!article.title) article.title=article.slug;
       if(article.title.toLowerCase().indexOf(self.state.searchString.toLowerCase().trim())<0){
        return null;
       }
       var className='collection-item' + (self.isFeatured(article.article_id) ? ' featured' : '');
     return(
       <li className={className} key={article.slug} onClick={(e)=>self.selected(e)}>{article.title}
          <div className="action" onClick={(e) => self.feature(e,article)}><button className="btn">Set</button></div>
       </li>
      )
    })
    return (
          <div className="card layout-one-card">
             
          <div className="card-title primary-background white-text">Add featured - <i>{data.topic_slug}</i></div>
            <Spinner show={this.state.saving}/>
            <div className={(this.state.saving ? 'saving ':'') + 'card-content'}>

              <div className="">
                <label>Title</label>
                <input type="text" value={data.searchString} onChange={this.search}/>
                
              </div>
               <div className="article-collection">
             
                  <ul className="collection " >
                 
                  {Articles}
                   
                  </ul>
              </div>
           
          </div>
          </div>
    

        
    )
  }
});