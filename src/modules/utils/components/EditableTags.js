import React from 'react';
export default React.createClass({
  getInitialState(){
  	return {
  		data:this.props.data || [] ,
  	}
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
	add(tag){
    var self=this,
	     data=self.state.data.slice(),
       i=data.indexOf(tag);
    if(i<0){
		  data=data.concat([tag]);
      self.setState({
        data
      },function(){
        self.props.add(tag)
      })
    }else{
      console.log('duplicate')
  	 }
  },
  onKeyPress(event){
    if (event.key === 'Enter') {
      this.add(event.target.value);
      event.target.value='';
    }
  },
  remove(tag){
  	var data=this.props.data;
  	var i=data.indexOf(tag);
    if(i>-1){
    	this.props.remove(i)
     }
	},
  render: function() {
  	var data=this.state.data.slice(),
  	    Tags=null;

  	if(data.length>0){
  	 Tags = data.map((tag) =>
        <div className="chip">
        	{tag}
        	    <i className="close material-icons" onClick={() => this.remove(tag) }>close</i>
        </div>
       );
    }
	  return(
  	 	<div>
  	 		<input id="slug-input" onKeyPress={this.onKeyPress}/>
    		<div>
	 				{Tags}
    		</div>        
  	 	</div>
  	 )
  }
});
