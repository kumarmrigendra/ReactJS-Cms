const TIMEOUT=3000;
var remove=function remove(node){
		console.log('removing',node)
		node.style.display='none';
	}

module.exports={
	show:function(opts,cb){
		var timeout=opts.timeout ? opts.timeout : TIMEOUT,
			id=opts.id ? opts.id : Date.now(),
			node = document.createElement("DIV"),                // Create a <li> node
			textnode = document.createTextNode(opts.message);      // Create a text node
		
		node.appendChild(textnode); 
		node.id=id;
		node.className=opts.context + ' toast';                             // Append the text to <li>
		document.getElementById('toast-container').appendChild(node);
		
		setTimeout(function(){
			remove(node);
			if(opts.onRemove) opt.onRemove();
		},timeout);
		return node;
	},
	remove
	
}