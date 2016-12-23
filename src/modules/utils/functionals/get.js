import { API } from './../../../stub/APPLICATION';
var superagent = require('superagent');
const REQUEST = function request(options, callback) {
  const URL = options.apiUrl || API.prefix + API.suffix + options.url;
  superagent.get(URL)
    .query(options.query)
    .query({data:options.payload})
    .set('Accept', 'application/json,application/x-www-form-urlencoded')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((error, response) => {
      var res = {};
      try {
        if (!error && response && response.body) {
          res = response.body;
         
        }
      } catch (e) {
        //logger
        error = true;
        res = {
          code: 999,
          message: 'Parse Error in post response'
        }
      }

      callback(error, res);
    });
}

export default REQUEST;
