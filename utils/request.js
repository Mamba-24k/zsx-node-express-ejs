const request = require("request");

const $request = (type, url, params) => {
  return new Promise((resolve, reject) => {
    type = type.toLowerCase();
    let options = {
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      method: type,
      json: true,
      body: params
    };

    function callback(error, response, res) {
      if (!error && response.statusCode == 200) {
        type == 'get' && (res = JSON.parse(res))
        if (res.code == 0) {
          resolve(res)
        }else {
          reject(res.msg)
        }
      }else {
        reject(error)
      }
    }
    if (type == 'post') {
      request(options, callback);
    }else if (type == 'get') {
      params = params ? params : ''
      request.get(url + params, callback)
    }
  })
}
$request.get = function (url, params) {
  let self = this;
  return self('get', url, params)
}
$request.post = function (url, params) {
  let self = this;
  return self('post', url, params)
}

$request.all = function (...optionArray) {
  let self = this;
  let requestArray = optionArray.map(item => {
    let {type, url, params} = item;
    return self(type, url, params)
  })
  return Promise.all(requestArray)
}

module.exports = $request;