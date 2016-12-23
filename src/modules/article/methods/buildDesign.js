import { extractDesign } from './';
export default function(arr) {
	console.log(arr);
	for(var i=0;i<5;i++){
		console.log(i);
		var arr2=extractDesign(i).toString();
		if(arr.toString() == arr2){
			return i;
		}
	}
	return 0;
}
