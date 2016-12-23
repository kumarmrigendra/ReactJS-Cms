import { get, post, localUser } from './../../utils/functionals';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';

module.exports = {

  getData(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['get_categories']
    };
    get(request, cb);
  },
  save(query,cb){
     var user=localUser.get();
      if(!user || !query || typeof(query)!='object') {
        cb('error','');
        return;
      }
      query.userid=user.info._id || '';
      query['userid'] = user.info._id || '';
      var request = {
        payload: query,
        apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['save']
      };
        post(request, cb);
    },
   create(query,cb){
     var user=localUser.get();
      if(!user || !query || typeof(query)!='object') {
        cb('error','');
        return;
      }
      
      query.userid=user.info._id || '';
      query['userid'] = user.info._id || '';
      var request = {
        payload: query,
        apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['create']
      };
        post(request, cb);
    },
}
