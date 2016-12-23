import React from 'react';
import dashboardServices from './../../services/';
import Gauge from './../chart/gauge';
import { If } from './../../../utils/components';

export default React.createClass({
	getInitialState(){
		return{
			pastLens: {
				results: [],
				avg_eng: '',
				fatigue: '',
			},
		}
	},
	search: function(){ 
        var that=this; 
        var searchVal = that.input.value;
        dashboardServices.pastLens({query: searchVal},function(err,res) { 
             that.setState({
                    pastLens: {
                        results: res.results,
                        avg_eng: res.avg_eng,
                        fatigue: res.fatigue,
                    }
                    });   
         });
    },
    close: function(){ 
        var that=this; 
        that.setState({
            pastLens: {
                results: [],
                avg_eng: '',
                fatigue: '',
            }
        })
    },
	render(){
		return(
			<div className="col s12 m4 l3 height-100pt">
            	<div className="card height-100pt-over-hide">
                    <div className="card-action border-bottom">
                      	<span className="card-title activator grey-text text-darken-4">Past Engagement</span>  
                    </div>
                    <div className="card-image waves-effect waves-light cm-card">
                        <nav>
                            <div className="nav-wrapper">
                              
                                <div className="input-field">
                                  <input id="search" type="search" onChange = {this.search} required ref={(el) => this.input = el} />
                                  <label htmlFor="search"><i className="material-icons">search</i></label>
                                  <i className="material-icons" onClick = { this.close}>close</i>
                                </div>
                              
                            </div>
                        </nav>
                        <br />
                        <If test={this.state.pastLens.avg_eng}>
                            <Gauge  percentage = {this.state.pastLens.avg_eng} displayName = {'Expected Engagement'} />
                        </If>
                        <If test={this.state.pastLens.fatigue}>
                            <Gauge  percentage = {this.state.pastLens.fatigue} displayName = {'Fatigue'} />
                        </If>
                        
                        <table className="bordered highlight cm-table">
				            <tbody>
				            {
				            	this.state.pastLens.results.map(function(item, i){
				            		return(
						            	<tr key={i}>
						                	<td>
							                    <p className="cm-card__line-text"><a href={item.link} target='_blank'>{item.name}</a></p>
							                    <p className="cm-card__line-sub">Avg Engagement <span>{item.average}</span> Total Reach <span>{item.reach}</span></p>
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
		            	