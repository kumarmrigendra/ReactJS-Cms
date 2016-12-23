import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import { localUser } from './../../utils/functionals';
import { default as draftData } from './../stub/draftData';
import { buildDraftData } from './../methods'
module.exports = {
  create(query,cb){
  	var data=query.state;
    var user=localUser.get();
    
    data=buildDraftData(data);
    data.userid=user.info._id;
      var request = {
        payload: data,
        apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['create']
      };
      post(request, cb);
  },
   getArticle(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['get_article']
    };
    get(request, cb);
  },
  draft(query,cb){
    var data=query.state;
    console.log('draft',data,data.id)

    var user=localUser.get();
    var payload=buildDraftData(data);
    payload.userid=user.info._id;
    payload.articleid=data.id;
      var request = {
        payload,
        apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['draft']
      };
      post(request, cb);

  }
}




// RES =>
// 	meta_data =>
// 		meta_data =>
// 	content_data => 
// 		data => 
// 			data => 
// 				ver_data =>
// 				meta_data => 



// RES =>
// 	{
// 		meta_data =>{
// 			meta_data =>{

// 			}
// 		}
// 		content_data => {
// 			data => {
// 				data => {
// 					ver_data =>{

// 					},
// 					meta_data => {

// 					}
// 				}
// 			}
// 		}

// 	}
