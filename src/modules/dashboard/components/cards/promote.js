import React from 'react';
import dashboardServices from './../../services/';

export default React.createClass({
	getInitialState(){
		return{
			promote: '',
			currentPage: [],
			selectOptions:[
            {label:'ScoopWhoop', key: 'fb_sw'},{label:'Vagabomb', key: 'fb_vb'}, 
            {label:'GazabPost', key: 'fb_gp'}, {label:'ScoopWhoop Videos', key: 'fb_sw_v'}, {label: 'OmNomNom', key: 'fb_sw_onn'}],
            
		}
	},    
	change:function(event){
        var clicked = event.target.value;
        this.setState({
        	currentPage: this.state.promote[clicked],
        });
    }, 
	componentDidMount(){
		var that=this;
		var promote = {};  
        dashboardServices.promote({},function(err,res) {
	    	for(var item in res){
	    		promote[item.replace(/-/g, '_')] = res[item];
        	}
            that.setState({
                promote:promote,
                currentPage: promote['fb_sw']
            }); 
         });

	},
	render(){
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
						            	this.state.currentPage.map(function(item, i){
						            		return(
								            	<tr key={i}>
								                	<td>
									                    <p className="cm-card__line-text"><a href={item.link} target='_blank'>{item.name}</a></p>
									                    <p className="cm-card__line-sub">Reach <span>{item.reach}</span> Engagement <span>{item.engaged}</span></p>
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