import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';

module.exports = {
  getGroups(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getGroups']
    };
    get(request, cb);
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
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getAll']
    };
    get(request, cb);
  },
  create(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['createGroup']
    };
    post(request, cb);
  },
  invalidateGroup(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    query['userid'] = user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['invalidateGroup']
    };
      post(request, cb);
  },
  update(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['updateGroup']
    };
    post(request, cb);
  }
}
