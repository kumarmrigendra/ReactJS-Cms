import { default as Color } from './color';
module.exports = {

	doughnut(dataset){

		var	doughnutObj = {
	  		labels: [],
	  		datasets: [{
				data: [],
				backgroundColor: [],
				hoverBackgroundColor: []
			}]
		};

		for(var key in dataset){
			doughnutObj.labels.push(key);
			doughnutObj.datasets[0].data.push(dataset[key]);
		}
		doughnutObj.datasets[0].backgroundColor = Color.platteList(doughnutObj.labels.length);
		doughnutObj.datasets[0].hoverBackgroundColor = Color.platteList(doughnutObj.labels.length);

		return doughnutObj;
	},

	bar(dataset){
		var barObj = {
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
			};
		for(var key in dataset){
			barObj.labels.push(key);
			barObj.datasets[0].data.push(dataset[key]);
		}
		// console.log();
		return barObj;	
	}

}