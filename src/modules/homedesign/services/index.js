import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';

module.exports = {
	getHomepageData(query,cb){
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['GET_HOMEPAGE_DATA']
    };
    get(request, cb);
  },
  getTrendingData(query,cb){
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['GET_TRENDING_DATA']
    };
    get(request, cb);
  },
  postHomepageData(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['GET_HOMEPAGE_DATA']
    };
    post(request, cb);
  },
  postTrendingData(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['PUB_TRENDING_DATA']
    };
    post(request, cb);
  }
}
