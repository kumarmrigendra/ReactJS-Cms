

import React from 'react';
import { Link, withRouter } from 'react-router';

export default React.createClass({
  getInitialState:function(){
    return {
      context:null,
      data:{}
    }
  },
  componentWillReceiveProps(props){
    console.log('x',props)
   this.setState({
    data:props.data
   })
  },
  render: function() {
    
      return (

              <div className="card-panel teal toast" >
                <span className="white-text"> {this.state.data.message}
                </span>
              </div>
        
         
          
        
      )
  }
 
});

