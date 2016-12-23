import React from 'react';
import { Tags } from './../../utils/components';
import { Link } from  'react-router';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data || []
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
  searchArticles(){
    // var self=this;
    // this.props.search({
    //   articles:{
    //     titleClick(article){
    //       self.loadArticle(article);
    //     },
    //     closeAfterTitleClick:true
    //   }
    // })
  },
  loadArticle(article){
    //console.log('article loaded',article);
  },
  render() {
    var data=this.state.data || {};
    var featured_articles=this.state.data.featured_articles || {};
    var FeaturedArticles=Object.keys(featured_articles).map((key,index)=>
       <li className="collection-item"><a href="#">{featured_articles[key].slug}</a></li>
    )
    var articles=data.articles || [];
    
    var Articles=articles.map(function(article){
       if(!article.title) article.title=article.slug;
   
       return(
         <li className="collection-item"><a href="#">{article.title}</a></li>
        )
      })
    return (
    
        <div className="card layout-one-card sticky-action">
          <div className="card-title">{data.topic_name}</div>
            <div className="card-content">
               <div className="entity">
                <label>Title</label>
                <p>{data.topic_name}</p>
              </div>
              <div className="entity feature-image">
                <label>Featured Image</label>
                 <img className="materialboxed"  src={data.topic_feature_img}/>
              
              </div>
              <div className="entity">
                <label>Description</label>
                <p>{data.topic_desc}</p>
              </div>
              <div className="entity">
                 <label>Tags</label>
                  <Tags data={data.tags}/>
              </div>
               <div className="entity">
              <label>Featured Article</label>
                  <ul className="collection " >
                 
                  {FeaturedArticles}
                   
                  </ul>
              </div>
              <div className="entity article-collection">
              <label>Articles</label>
                  <ul className="collection " >
                 
                  {Articles}
                   
                  </ul>
              </div>
           
            </div>
            <div className="card-action">
             <Link className="btn" to={'/topics/'+data.topic_slug+'/edit'}>Edit</Link> 
             <Link className="btn" to={'/topics/'+data.topic_slug+'/feature'}>Add featured article</Link>   
            </div>
          </div>
    

        
    )
  }
});