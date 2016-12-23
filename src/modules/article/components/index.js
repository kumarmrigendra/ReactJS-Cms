import React from 'react';
import { Spinner } from './../../utils/components';
import { localUser, toast, slugify } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import { default as DesignOptions } from './DesignOptions';
import { default as Content } from './Content';
import { default as Title } from './Title';
import { default as Metadata } from './metadata';
import { default as Box } from './box';
import { default as Author } from './box/Author';
import { default as Slug } from './box/slug';
import { create, getArticle, draft } from './../services';

import { defaultMetaData, defaultContentData, defaultAuthorData, defaultExtraData } from './../stub';
import { extractData, extractDesign, buildDesign } from './../methods';
export default React.createClass({
	getInitialState(){
		return {
  	  view:'content',
      id:this.props.params.id || null,
      loading:true,
		}
	}, 
  componentWillReceiveProps(props){
    if(this.state.id != props.params.id){
      this.setState({
        loading:true
      });
      this.checkData(props.params.id);
    }
  },
  componentWillMount(){
    this.checkData(this.state.id);
  },
  componentWillUpdate(){
   //  this.checkData(this.state.id);
   },
  loadJquery(){
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

  },
  loadedJquery(){
    this.bindScrolls();
  },
  checkJquery(callback){
    var self=this;
    if (window.jQuery) {
      self.loadedJquery();
    }
    else {
      window.setTimeout(function() { self.checkJquery(callback); }, 100);
    }
  },
   componentDidMount(){
    document.getElementById('main-header').className="";
    this.loadJquery();
    this.checkJquery();
  },
  lastScroll:0,
  elems:{
    rightPanel:{
      el:null,
      top:null,
      width:true,
      stickyClass:'sticky',
      id:'right-panel',
      child:'wrapper'

    },
    stickyHeader:{
      el:null,
      top:null,
      width:false,
      id:'switch-navbar',
      stickyClass:'navbar-fixed'
    }

  },
  stickyHeader(){
    this.stickMe('stickyHeader');
  },
  stickyPanel(){
    this.stickMe('rightPanel');
  },
  stickMe(key){
    var elem=this.elems[key];
    if(!elem.el){
      elem.el=$('#' + elem.id);
      elem.top=elem.el.position().top;
    }
    if(elem.width){
      elem.width=false;
      elem.el.find('.'+ elem.child).css('width',elem.el.find('.'+ elem.child).css('width'));
    }
   var sc = $(window).scrollTop()
   if (sc > elem.top) {
      elem.el.addClass(elem.stickyClass)
   } else {
      elem.el.removeClass(elem.stickyClass)
    }
  },

  bindScrolls(){
    $(window).bind('scroll',this.stickyHeader)
    $(window).bind('scroll',this.stickyPanel)

  },
  componentWillUnmount(){

     $(window).unbind('scroll',this.stickyHeader)
     $(window).unbind('scroll',this.stickyPanel)
     //document.getElementById('main-header').className="navbar-fixed";
  },
  error(){

  },
  checkData(id){
    var self=this;
    if(id){
      getArticle({
        "articleid":this.state.id,
        "version_no":""
      },function(err,res){
        if(!err || res.status==1 ){
          const EXTRACT=extractData(res);
          self.setData(EXTRACT,id);
        }else{
          self.error();
        }
      });
    }else{
      const EXTRACT={
        metaData:defaultMetaData,
        contentData:defaultContentData,
        authorData:defaultAuthorData,
        extraData:defaultExtraData
      }
      self.setData(EXTRACT,id)
    }
  },
  setData(EXTRACT,id){
    this.setState({
      id,
      view:'content',
      loading:false,
      metaData:EXTRACT.metaData,
      contentData:EXTRACT.contentData,
      authorData:EXTRACT.authorData,
      extraData:EXTRACT.extraData
    })
  },
  toggleSettings(){
    this.setState({
      settings:!this.state.settings
    })
  },
  switch(view){
    this.setState({
      view
    })
  },
  draft(cb){
    var self=this;
    this.setState({
      loading:true
    })
    if(this.state.id){
      draft({
        state:this.state
      },function(err,res){
        self.setState({
          loading:false
        })

      })
    }else {
      this.create();
    }
  
  },
  create(cb){
    var self=this;
    create({state:this.state},function(err,res) {
      if(res.status==1){
        window.history.pushState("", "", "/article/edit/" + res.data.articleid);
        self.setState({
          id:res.data.articleid,
          loading:false
        });
      }
    })
  },
  publish(){
    this.draft(function(){

    })
  },
  updateMetadata(metaData){
    this.setState({
      metaData
    })
  },
  updateContent(content){
    var contentData=JSON.parse(JSON.stringify(this.state.contentData));
    contentData.content=content;
    this.setState({
     contentData
    })
  },
  updateTitle(title){
    var contentData=JSON.parse(JSON.stringify(this.state.contentData));
    contentData.title=title;
    if(this.state.extraData.state=='published'){
          this.setState({
           contentData
        })      
    }else{
      this.slugInput(title,contentData)
    }

  },
  updateAuthor(authorData){
    if(authorData.author==null || Object.keys(authorData.author).length<1){
      authorData.author=JSON.parse(JSON.stringify(defaultAuthorData.author));
    }
    
    this.setState({
      authorData
    })
  },
  updateDesign(design){
    var extraData=JSON.parse(JSON.stringify(this.state.extraData));
    extraData.design=design;
    this.setState({
     extraData
    })
  },
  slugInput(e,content){
    var extraData=JSON.parse(JSON.stringify(this.state.extraData));
    var contentData=content  || JSON.parse(JSON.stringify(this.state.contentData));
    extraData.slug=content ? slugify(content.title) : slugify(e.target.value);
    this.setState({
      extraData,
      contentData
    });
  },
  render() {
    if(this.state.loading){
      return (
         <Spinner show={true} />
        )
    }
  	var self=this;
    return (
        <div id="article-edit">
            <div className="row">
              <div id="switch-navbar">
                <nav className="nav-extended">
                  <div className="nav-wrapper">
                    <ul className="tabs tabs-transparent">
                      <li className="tab"><a className={(this.state.view=='content')? 'active' : ''} onClick={()=>this.switch('content')}>Content</a></li>
                      <li className="tab"><a className={(this.state.view=='metaData')? 'active' : ''} onClick={()=>this.switch('metadata')}>Metadata</a></li>
                      <li className="tab"><a className={(this.state.view=='html')? 'active' : ''} onClick={()=>this.switch('html')}>HTML</a></li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col s9">
                 <div className="card-panel">
                    <DesignOptions passBack={ this.updateDesign } status={ true } design={ this.state.extraData.design }/>
                  </div>
                <Title update={this.updateTitle} title={this.state.contentData.title} status={this.state.view=='content'} />
                
                <Content update={this.updateContent} content={this.state.contentData.content} status={this.state.view=='content'} />
                
                <Metadata status={this.state.view=='metadata'} metadata={this.state.metaData} metaDataUpdate={this.updateMetadata}/>
              </div>
              
              <div className="col s3" id="right-panel">
                <div className="wrapper">
                  <div className="card-panel">
                      <Slug slug={ this.state.extraData.slug } input={ this.slugInput }/>
                  </div>
                   <div className="card-panel">
                    <Author passBack={ this.updateAuthor } data={this.state.authorData} />
                  </div>
                  <Box 
                    publish={this.publish}
                    draft={this.draft} 
                    status={true}
                    view={this.state.view} 
                    extraData={ this.state.extraData }
                  />
                </div>
              </div>
            </div>
        </div>
    )
  }
});

