import React from 'react';
import { default as Tile } from'./Tile';
import ArticleActions from './ArticleActions';
export default React.createClass({
	getInitialState(){ 
		return {
			articles:this.props.articles,
			bookmark: [],
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			articles:props.articles
		})
	},
	titleClick(article){
		var options=this.props.options;
		if(options.titleClick ){
			options.titleClick(article)
			if(options.closeAfterTitleClick){
				this.props.close();
			}
			return;
		}
	},
	draft(idx){
		const articles = this.state.articles;
		articles[idx].cur_state = 'draft';
		this.setState({articles});
	},
	invalidated(idx){
		const articles = this.state.articles; 
		delete articles[idx]; 
		this.setState({articles});
	},
	pinArticle(e){ 
		let id = e.currentTarget.id;
		let bookmark = this.state.bookmark;
		bookmark.indexOf(id)!==-1 ? bookmark.splice(bookmark.indexOf(id), 1) : bookmark.push(id);
		console.log(bookmark);
		global.localStorage.setItem('bookmark', JSON.stringify(bookmark));
		this.setState({bookmark});
		console.log(global.localStorage.getItem('bookmark'), typeof(bookmark), bookmark);
	},
	getBookmarkFromLS(){
        let bookmark = [];
        bookmark  = JSON.parse(global.localStorage.getItem('bookmark')) || [];
        this.setState({bookmark});
    },
    componentWillMount(){
    	this.getBookmarkFromLS();
    },
	render() { 
		// this.getBookmarkFromLS();
		var children=this.state.articles.map((article, i) =>
			<li className="row" key={i}>
		        <div className="col s12 m12">
		          <div className="card article-listicle collection-item article-image">

		          <img src={ article.feature_img} alt="" className="rectangle" />
			         
		          <div className="row margin-bottom-0">
		          	<div className="col s6 m6 l8">  	
			        	<span className="title" onClick={() => this.titleClick(article)}>{article.title}</span>
				      	<p className="article-info"><span className="updated-by">{article.last_upd_by}</span><span className="updated-on">{article.last_upd_date}</span>
		        	 		<i className="material-icons tiny">{article.cur_state === 'published' ? 'flag' : 'drafts'}</i>
		      			</p>
				    </div>
				    <div className="col s6 m6 l4">
				    	<a id={article._id} href="#!" onClick={this.pinArticle} className={this.state.bookmark.indexOf(article._id)!==-1 ? 'secondary-content' : 'empty-content'}><i className="material-icons">grade</i></a>
				    	<ArticleActions id={i} article={{_id: article._id, cur_state: article.cur_state, title: article.title}} invalidated={this.invalidated} draft = {this.draft} />
				    </div>
			      </div>	
		          </div>		
		        </div>
	      	</li>
    );
    if(children && children.length>0){
	    return(
	   	 	<Tile header={this.props.header}>
   	 			{children}
   		 	</Tile>
   		)    	
    }else{
    	return null;
    }	
  }
});
 
// drafts
//publish
//delete_sweep
//edit
//local_activity 


// "title": $scope.searchResultsAll.articleData.data[l].title,
// "type": 'Article',
// "_id": $scope.searchResultsAll.articleData.data[l]._id,
// "last_upd_date": $scope.searchResultsAll.articleData.data[l].last_upd_date,
// "last_upd_by": $scope.searchResultsAll.articleData.data[l].last_upd_by,
// "status": $scope.searchResultsAll.articleData.data[l].cur_state,
// "profile_pic": "",
// "show": $scope.searchResultsAll.articleData.data[l].show