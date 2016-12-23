import { localUser } from './../../utils/functionals';
import { extractDesign } from './../methods';
const USER=localUser.get();
var author={};
if(USER){
	author={
		username:USER.info.username,
		id:USER.info._id,
		display_name:USER.info.display_name,
		url:USER.info.author_url
	}
};
module.exports ={
	defaultMetaData:{
	   "cur_state":'',
    'short_heading':'default',
      category:{
        list:[],
        display:[]
      },
    "qtags": 'default',
      extra:{
         "art_type2": '',
         "art_type1": '',
        "recommendations": true,
        "advertisements":true,
        "ia": 0,
        "app": 0,
        "website":0,
        "amp": 0,  
      },
      bucket:'',
      "feature_image":{
        img:'',
        src:'',
        original_src: '', 
        more:[]
      },
      tags: [],
     
	},
	defaultContentData:{
		title:'',
		content:''
	},
	defaultAuthorData:{
	 	author,
      	'co_author': [],
	},
  defaultExtraData:{
     design:extractDesign(0),
     state:'new',
     slug:''

  },
 
	bucketList:[
                {
                    value:'comics',
                    label:'Comics'
                },
                {
                    value:'reads',
                    label:'Reads'
                },
                {
                    value:'travel',
                    label:'Travel'
                },
                {
                    value:'food',
                    label:'Food'
                },
                {
                    value:'women',
                    label:'Women'
                }
     ]
}