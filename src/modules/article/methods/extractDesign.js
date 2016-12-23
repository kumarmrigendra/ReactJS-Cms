export default function(val) {
	return [
		Number((val==0)),
		Number(val==1 || val==2),
		Number(val==1 || val==4)
	]
}