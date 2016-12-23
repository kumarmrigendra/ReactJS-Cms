
import { get, localUser } from './';
import { API as GLOBAL_API } from './../../../stub/APPLICATION'
export default function(slug,cb){
	const user=localUser.get();
   
   var query={
   	slug:slug,
   	userid:user.info._id
   }
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + '/check_slug_exists/'
    };
    get(request, cb);
}