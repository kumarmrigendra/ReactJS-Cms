import React from 'react';
import dashboardServices from './../../services/';
import chartColor from './../chart/color';
import PerCircle from './../chart/percircle';

let projections = [{src: 'https://s3.scoopwhoop.com/sw/icons/sw-76x76.png', key: 'sw', percentage: 0},
				{src: 'https://s3.scoopwhoop.com/sw/icons/vb76x76.png', key: 'vb', percentage: 0},
				{src: 'https://s3.scoopwhoop.com/sw/icons/gp76x76.png', key: 'gp', percentage: 0}];

export default React.createClass({
	getInitialState(){
		return{
			scoreCard: { 
				projections: projections,
				bestPosts: {
					site_avg: '',
					articles: [],
				}

			}
		}
	},
    componentDidMount: function(){
        var that=this; 
        var responseRaw = '';

        dashboardServices.scoreCard({}, function(err, res){
        	responseRaw = res; 
        	var i = 0;
        	for(i = 0; i < Object.keys(responseRaw.projections).length; i++){
        		var j = 0;
        		for(j; j < projections.length; j++){
        			if(Object.keys(responseRaw.projections)[i].replace(/fb-/g, '') === projections[j].key){
        				projections[j].percentage = responseRaw.projections[Object.keys(responseRaw.projections)[i]];
        			} 	
        		}		
        	};
        	that.setState({
        		scoreCard: { projections,
        			bestPosts: {
        				site_avg: responseRaw.best_posts_yesterday.site_avg,
        				articles: responseRaw.best_posts_yesterday.articles,
        			},
        			competitorsPosts: responseRaw.competitors_Reviews_yesterday.competitor_smlr_posts, 
        		}
        	});
        });


    },
	render(){
		var self = this;
		return(
			<div className="col s12 m4 l3 height-100pt">
                <div className="card height-100pt-over-hide">
                    <div className="card-action border-bottom">
                      <span className="card-title activator grey-text text-darken-4">Score Card</span>  
                    </div>
                    <div className="card-image waves-effect waves-light cm-card">
                    	<table className="bordered highlight cm-table">
				            <tbody>
					            <tr>
					            	<td>
				                		<div className="row margin-bottom-0">
									      <div className="col s12 m12">
									        <div className="card-panel teal height-100pt-over-hide projections">
									        	<h5>Projection</h5>
									        	{
									        		this.state.scoreCard.projections.map(function(item, i){
									        			return(
									        				<div className="row" key={i}>
												        		<div className="left logoContainer"><img className={item.key} src={item.src} /></div><div className="right"><PerCircle  percentage = { item.percentage }/></div>	 	
												        	</div>	
									        			)
									        		})
									        	} 
									        	
									        </div>
									      </div>
									    </div>
				                	</td> 
					            </tr>
					        </tbody>
				        </table>

				        <table className="bordered highlight cm-table">
					        <tbody>
					        	<tr>
					            	<td className="best-post">
					            		<h5>Best Posts - Yesterday</h5>
					            	</td>
					            </tr>
					            {
					            	this.state.scoreCard.bestPosts.articles.map(function(item, i){
					            		return(
							            	<tr key={i}>
							                	<td>
								                    <p className="cm-card__line-text"><a href={item.link} target='_blank'>{item.name}</a></p>
								                    <p className="cm-card__line-sub">Avg Engagement <span>{item.avg}%</span></p>
							                	</td>                            
							              	</tr>
							            )
					            	})
					            }
					        </tbody>
				        </table>

                    </div>
                </div>
            </div>		
		)
	}
})


                    




