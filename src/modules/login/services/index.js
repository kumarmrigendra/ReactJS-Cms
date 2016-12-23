import post from './../../utils/functionals/post';
import { API } from './../stub/api.json';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';

module.exports = {
  login(form, cb) {
    var request = {
      payload: form,
      apiUrl: GLOBAL_API.prefix + GLOBAL_API.suffix + API.login
    };
    console.log(request.payload);
    post(request, cb);
  },
  logout(cb) {
    delete localStorage.token
  }
}
