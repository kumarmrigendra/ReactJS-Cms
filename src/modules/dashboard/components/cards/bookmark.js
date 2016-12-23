import React from 'react';
import { getArticle } from './../../../article/services/';
import { If, Spinner } from './../../../utils/components';

export default React.createClass({
	getInitialState(){
		return {
			article: {},
			spinner: true,
		}
	},
	componentWillReceiveProps(props){
		var self = this;  
    	var articleid = this.props.articleid;  
    	getArticle({articleid}, function(err, res){ 
    		self.setState({ article:res, spinner: false });
    	})

	},
	render(){ 
		return(
			<div className="col s12 m4 l3 height-100pt">
                <div className="card height-100pt-over-hide">
					{
						this.state.article.status !== 1  ? ( 
							<If test={this.state.spinner}>
					            	<div className='spinner-container'>	
					              		<Spinner show='true'/>
					              	</div>
					            </If> 
		            	) : (
		              	 	<div className="card-image waves-effect waves-light padding-10">
		              	 		<p className="cm-card__line-text"><a href={this.state.article.meta_data.slug} target='_blank' data-tooltip="Im the tooltip text.">{this.state.article.meta_data.title}</a></p>
								<p className="cm-card__line-sub">Last modified by <span>{this.state.article.meta_data.last_upd_by}</span> @ <span>{this.state.article.meta_data.last_upd_date}</span><i id={this.state.article.meta_id} className="material-icons">settings</i></p>
		              	 	</div>
            )
        }
        </div>
        </div>
		)
	}

}) 