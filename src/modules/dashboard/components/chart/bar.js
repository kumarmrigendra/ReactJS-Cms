import React from 'react';
import {Bar} from 'react-chartjs-2';

 
export default React.createClass({

  getInitialState(){
    return{
      chart: {
        labels: [],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
          }]
        } | {}
    }    
  },
  componentWillReceiveProps(props){ 
    this.setState({
      chart: props.dataSet
    })
  },  
  render() { 
    return (
      this.state.chart == '' ? null : (
      <div> 
        <Bar
          data={ this.state.chart }
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
      )
    );
  }
});
