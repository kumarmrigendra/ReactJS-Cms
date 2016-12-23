import React from 'react';
import dashboardServices from './../../services/';
import chartColor from './../chart/color';
import PerCircle from './../chart/percircle';

export default React.createClass({
	getInitialState(){
		return{
			projections:[],
			percentage: 10
		}
	},
	kFormatter(num) {
        return num > 999 ? ( num > 999999 ? (num / 1000000).toFixed(1) + 'm' : (num / 1000).toFixed(1) + 'k') : num
    },
    componentDidMount: function(){
        var that=this; 

        dashboardServices.projections({},function(err,res) { 
             that.setState({
                      projections: res
                    });  
         });
    },
	render(){
		var self = this;
		return(
			<div className="col s12 m4 l3 height-100pt">
                <div className="card height-100pt-over-hide">
                    <div className="card-action border-bottom">
                      <span className="card-title activator grey-text text-darken-4">Projections</span>  
                    </div>
                    <div className="card-image waves-effect waves-light cm-card">
                    	<table className="bordered highlight cm-table">
				            <tbody>
				            {
				            	this.state.projections.map(function(item, i){
				            		return(
						            	<tr key={i}>
						                	
						                	<td>
						                		<div className="row margin-bottom-0">
											      <div className="col s12 m12">
											        <div className="card-panel teal height-100pt-over-hide projections">
											        	<h6>{item.page}</h6>
											        	<p className="flow-text height-100pt-over-hide">
											        		<span className="white-text left">
											        			7 Day Stats
											        		</span>
												          	<span className="white-text right">
												          		{self.kFormatter(item['7_day'])}
												          	</span>
												        </p> 
												        <p className="flow-text height-100pt-over-hide">
											        		<span className="white-text left">
											        			30 Day Stats
											        		</span>
												          	<span className="white-text right">
												          		{self.kFormatter(item['30_day'])}
												          	</span>
												        </p> 
												        <p className="flow-text height-100pt-over-hide">
											        		<span className="white-text left">
											        			Projection for 30 days
											        		</span>
												          	<span className="white-text right">
												          	
												          		{self.kFormatter(item['30_projection'])}
												          	</span>
												        </p> 
											        	<PerCircle  percentage = { item['projection_percent'] }/>	 	
											        </div>
											      </div>
											    </div>
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


                    




