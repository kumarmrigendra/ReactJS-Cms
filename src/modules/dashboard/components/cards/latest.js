import React from 'react';
import dashboardServices from './../../services/';
import { default as Doughnut } from './../chart/doughnut';
import { default as Bar } from './../chart/bar';
import { default as chartUtils } from './../chart/utils';

export default React.createClass({
	getInitialState(){
		return {
			latest: {
				resultset: [],
				topics: {},
				keywords: {},
				publishers: {},
			}
		}
	},
	componentDidMount(){
		var that = this;
		dashboardServices.latest({},function(err,res) { 
			var resData = res;
			resData.topics = chartUtils.doughnut(resData.topics);
			resData.publishers = chartUtils.doughnut(resData.publishers);
			resData.keywords = chartUtils.bar(resData.keywords);
            that.setState({
                      latest: {
                      	resultset: resData.resultset,
                      	topics: resData.topics,
                      	publishers: resData.publishers,
                      	keywords: resData.keywords,
                      }
                    }); 
         });
	},
	render(){
		// console.log('render,',this.state.latest.topics);
		// console.log(typeof(this.state.latest.keywords));
		return(
			<div className="col s12 m4 l3 height-100pt">
                <div className="card height-100pt-over-hide">
                    <div className="card-action border-bottom">
                      <span className="card-title activator grey-text text-darken-4">Realtime Trends</span>  
                    </div>
                    <div className="card-image waves-effect waves-light cm-card">
                    	
                        <table className="bordered highlight cm-table">
				            <tbody>
				            {
				            	this.state.latest.resultset.map(function(item, i){
				            		return(
						            	<tr key={i}>
						                	<td>
							                    <p className="cm-card__line-text"><a href={ item.slug } target='_blank'>{ item.headline }</a></p>
							                    <p className="cm-card__line-sub">Published by <span>{ item.source.publisher }</span> Velocity @ <span>{item.nw_score}</span></p>
						                	</td>                            
						              	</tr>
						            )
				            	})
				            }
				            </tbody>
				        </table> 
				        <br />
				        <Bar dataSet = { this.state.latest.keywords } />
                        <Doughnut  dataSet = { this.state.latest.topics } />
                        <Doughnut  dataSet = { this.state.latest.publishers } />     
                    </div>
                </div>
            </div>
			)
	}
})






                    