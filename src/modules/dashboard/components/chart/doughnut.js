import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default React.createClass({
  displayName: 'DoughnutExample',
  getInitialState(){
  	return{
  		chart:{
	  		labels: [],
	  		datasets: [{
				data: [],
				backgroundColor: [],
				hoverBackgroundColor: []
			}]
		}
  	}
  },
  componentWillReceiveProps(props){
  	this.setState({
  		chart: props.dataSet
  	})
  },
  render() {
    return (
      <div> 
        <Doughnut data={ this.state.chart } width={300}
          height={200}
          options={{
            maintainAspectRatio: false,
            legend: {
            display: true
         }
          }} />
      </div>
    );
  }
});