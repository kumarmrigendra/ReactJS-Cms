import { slug } from './../../../utils/functionals';
export default function(props){
	function validate(){
		slug(props.slug,function(err,res){
			if(res.status==1 && res.exists==0){
				document.getElementById('slug-input').className='success';
			}else{
				document.getElementById('slug-input').className='error';
			}
			console.log(err,res);
		})
	}
	return(
		<div id="slug-input">
           <label>Slug</label>
           <input placeholder="Enter Author" type="text" onChange={props.input} value={props.slug} />
           <i className="material-icons prefix" onClick={validate} >chevron_right</i>
        </div>
	)

}

