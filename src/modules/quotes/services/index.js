import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/api.js';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';
module.exports = {
  quotesManagement(query,cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: query,
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['publishQuote']
    };
      post(request, cb);
  },
  getQuote(query, cb) {
    var user=localUser.get();
    if(!user || !query || typeof(query)!='object') {
      cb('error','');
      return;
    }
    query.userid=user.info._id || '';
    var request = {
      payload: JSON.stringify(query),
      apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['getQuote']
    };
    get(request, cb);
  }
}
