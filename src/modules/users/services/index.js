import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';
module.exports = {
  getALLUSERS(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getAllUsers']
    };
    get(request, function(err,res){
      cb(err,res)
    });
  },
  getAll(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getAllUsers']
    };
    get(request, function(err,res){
      cb(err,res)
    });
  },
  invalidateUser(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['invalidateUser']
    };
    post(request, cb);
  },
  getPermissions(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      // apiUrl:'http://10.2.1.14:8080/swadmin/api/v2/get_all_permissions/'
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getPermissions']
    };
    get(request, function(err,res){
      cb(err,res)
    });
  },
  getGroups(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      // apiUrl:'http://10.2.1.14:8080/swadmin/api/v2/get_all_groups/'
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getGroups']
    };
    get(request, function(err,res){
      cb(err,res)
    });
  },
  createUser(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['createUser']
    };
    post(request, cb);
  },
  updateUser(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['editUser']
    };
    post(request, cb);
  },
  sendEmail(query, cb) {
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['sendemail']
    };
    post(request, cb);
  },
  resetPassword(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['resetPassword']
    };
    post(request, cb);
  },
}
