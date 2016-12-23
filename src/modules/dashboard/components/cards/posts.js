import React from 'react';
import dashboardServices from './../../services/';
import { getArticle } from './../../../article/services/';
import { If, Spinner } from './../../../utils/components';
import { QTags } from './../../../article/components/metadata/QTags';

export default React.createClass({
	getInitialState(){
		return{
			posts: [],
			selectOptions:[
            {label:'Last 10 Articles', key: 'lastWorkedOn'},{label:'Published', key: 'published'}, 
            {label:'Draft', key: 'draft'}, {label:'Invalidated', key: 'invalidated'}],
            spinner:false,
            articleInfo:'',
            cardReveal: false,
            metadata: {qtags: ''}
		}
	},    
	change:function(event){
        var clicked = event.target.value;
        this.renderPosts(clicked);
    },
	renderPosts: function(name){
        var that=this;
        dashboardServices[name]({},function(err,res) { 
            that.setState({
                posts:res.data
            }); 
         });
    },
    revealDetail(e){
    	var self = this; 
    	this.setState({ spinner:true });
    	var articleid = e.currentTarget.id;
    	// console.log(articleid);
    	getArticle({articleid}, function(err, res){
    		self.setState({ spinner:false, cardReveal:true });
    	})

    },
    closeReveal(){
    	this.setState({
    		cardReveal: false,
    	})
    },
	componentDidMount(){
		var that=this; 
        that.renderPosts('lastWorkedOn');
	},
	render(){
		var that  = this; 
		return(
			    <div className="col s12 m4 l3 height-100pt">
                    <div className="card height-100pt-over-hide">
                        <div className="card-action border-bottom">
                          

                            <select className='cm-select' onChange={this.change}>
                                {
                                    this.state.selectOptions.map(function(item, i){
                                        return(
                                                <option key={i} value={item.key}>{item.label}</option>
                                            )

                                        })
                                    }
                            </select>

                        </div>

                        <div className="card-image waves-effect waves-light cm-card">
                            
                        	<table className="bordered highlight cm-table">
					            <tbody>
					            {
					            	this.state.posts.map(function(item, i){
					            		return(
							            	<tr key={i}>
							                	<td>
								                    <p className="cm-card__line-text"><a href={item.slug} target='_blank' data-tooltip="Im the tooltip text.">{item.title}</a></p>
								                    <p className="cm-card__line-sub">Last modified by <span>{item.last_upd_by}</span> @ <span>{item.last_upd_date}</span><i id={item._id} className="material-icons" onClick={that.revealDetail}>settings</i></p>
							                	</td>                            
							              	</tr>
							            )
					            	})
					            }
					            </tbody>
					        </table>

                        </div>
                        <If test={this.state.spinner}>
                        	<div className='spinner-container'>	
		                  		<Spinner show='true'/>
		                  	</div>
		                </If>
                        <div className='card-reveal' style={this.state.cardReveal===false ? {display:'None', top:'100%'}: {display:'Block', top:'0'} } >
					      <span className="card-title grey-text text-darken-4">Quick Edit<i className="material-icons right" onClick={that.closeReveal}>close</i></span>
					      <p>Here is some more information about this product that is only revealed once clicked on.</p>
					       
					    </div>
                    </div>
                </div>
		)
	}
})