import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';

module.exports = {
  search(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['SEARCH']
    };
    get(request, cb);
  },

  unpublish(query, cb){ 
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    console.log(query);
    query.userid=user.info._id || '';
    var request = {
      payload: query,
          apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['UNPUBLISH']
      };
      console.log(request);
      post(request, function(err,res){ 
        console.log(err, res);
        cb(err,res)
      });
  },

  invalidate(query, cb){ 
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
          apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['INVALIDATE']
      };
      post(request, function(err,res){  
        cb(err,res)
      });
  },

  purge(query, cb){ 
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
          apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['PURGE']
      };
      post(request, function(err,res){  
        cb(err,res)
      });
  },

}
