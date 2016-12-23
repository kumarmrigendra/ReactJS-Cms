import React from 'react';
import { Link, browserHistory } from 'react-router';
import { postHomepageData, search } from './../services';
import { If, ElseIf } from './../../utils/components';
import { toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
export default React.createClass({
  getInitialState() {
      return {
        data: this.props.data|| {},
        type:this.props.type,
        articleData:null,
        form:{
          'title':'',
          'slug':'',
          'feature_img':''
        }
      }
  },
  componentWillReceiveProps(props){
    this.setState({
      data: props.data|| {},
      type:props.type
    })
  }, 
  input(event,key){
      var form=this.state.form;
      var value=event.target.value;
      form[key]=value;
      this.setState({
        form
      })
  },
  componentWillMount(){
    var form=this.state.form
    form={
          'title':this.state.data.title,
          'slug':this.state.data.slug,
          'feature_img':this.state.data.feature_img
        }
    this.setState({
      form
    })
  },
  updateTypeDesign(){
    var form=this.state.form;
    // var self=this;
    // var form={
    //   'title':self.state.data.title,
    //   'feature_img':self.state.data.feature_img,
    //   'slug':self.state.data.slug,
    //   'type':self.state.type,
    // }
    // delete form.category;
    // delete form.feature_type;
    // delete form.card_type;
    form['type']=this.state.type;
    
    postHomepageData({ data:form }, (err, res) => {
      if(res.status==0 || err){
        toast.show(Toast.error);
      }
      if (res.status==1){
        toast.show(Toast.updated);
        browserHistory.push('/homeDesign/'); 
      }
    })
  },
  search(){
    var self=this;
    this.props.search({
      articles:{
        titleClick(article){
          self.loadArticle(article);
        },
        closeAfterTitleClick:true
      },
    })
  },
  loadArticle(article){
    console.log(article)
    
    var form=this.state.form
    form={
          'title':article.title,
          'slug':article.slug,
          'feature_img':article.feature_img
        }
    this.setState({
      form
    })
  },
  render(){
    var component=this;
    return(
        <div className="card layout-one-card">
            <div className="card-title primary-background">Edit {component.state.type}</div>
            <div className="card-content">
              <button onClick={this.search} className="btn">Search Article</button>
              <div className="fieldSpace"></div>
              <div className="fieldSpace"></div>
              <div>
                <label>Article Title</label>
                <input type="text" value={component.state.form.title} onChange={(e)=>this.input(e,'title')}/>
              </div>
              <div className="fieldSpace"></div>
              <div>
                <label>Article Slug</label>
                <input type="text" value={component.state.form.slug} disabled/>
              </div>
              <div className="fieldSpace"></div>

              <If test={component.state.data.card_type==6 || component.state.data.card_type==2}>
                     
                  <div>
                    <label>Article Feature Image</label>
                    <input type="text" value={component.state.form.feature_img} onChange={(e)=>this.input(e,'feature_img')}/>
                  </div>
              </If>
              
              <If test={component.state.data.card_type==7}>
                     <div>
                         <div>
                    <label>Article Desktop Feature Image</label>
                    <input type="text" value={component.state.data.feature_img_desk} onChange={(e)=>this.input(e,'feature_img_desk')}/>
                    
                  </div>
                  <div className="fieldSpace"></div>
                  <div>
                    <label>Article Mobile Feature Image</label>
                    <input type="text" value={component.state.data.feature_img_mob} onChange={(e)=>this.input(e,'feature_img_mob')}/>
                  </div>
                     </div>
              </If>
              <If test={component.state.data.card_type==5}>
                <div>
                  <div>
                    <label>Article Feature Image</label>
                    <input type="text" value={component.state.data.feature_img} onChange={(e)=>this.input(e,'feature_img')}/>
                  </div>
                  <div className="fieldSpace"></div>
                  <div>
                    <label>Article Description</label>
                    <input type="text" value={component.state.data.description} onChange={(e)=>this.input(e,'description')}/>
                  </div>
                  <div className="fieldSpace"></div>
                  <div>
                    <label>Article Card Title</label>
                    <input type="text" value={component.state.data.topicTitle} onChange={(e)=>this.input(e,'topicTitle')}/> 
                  </div>
                  <div className="fieldSpace"></div>
                  <div>
                    <label>Article Highlights</label>
                    <input type="text" value={component.state.data.highlights} onChange={(e)=>this.input(e,'highlights')}/>
                  </div>
                </div>
              </If>
              
              <div className="card-action primary-background white-text">
                  <button onClick={this.updateTypeDesign} className="btn">Update</button>
              </div>
            </div>
        </div>
      )
  }
});


          