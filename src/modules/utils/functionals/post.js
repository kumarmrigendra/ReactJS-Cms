import { API } from './../../../stub/APPLICATION';
var superagent = require('superagent');
const REQUEST = function request(options, callback) {
  const URL = options.apiUrl || API.prefix + API.suffix + options.url;
 
  superagent.post(URL)
    .send(encode({ data: JSON.stringify(options.payload) }))
    .set('Accept', 'application/json,application/x-www-form-urlencoded')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((error, response) => { 
      var res = {};
      try {
        if (!error && response && response.text) {
          //                    res=JSON.parse(response.text)
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

var encode = function(data) {
  var buffer = [];
  for (var name in data) {
    if (!data.hasOwnProperty(name)) {
      continue;
    }
    var value = data[name];
    buffer.push(
      encodeURIComponent(name) + "=" + encodeURIComponent((value === null) ? "" : value));
  }
  var source = buffer.join("&").replace(/%20/g, "+");
  return (source);
}
export default REQUEST;
