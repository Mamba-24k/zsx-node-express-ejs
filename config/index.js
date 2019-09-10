let test_config = require('./test');
let prod_config = require('./prod');

let env = process.env.NODE_ENV;

let config;
if (env == 'production') {
  config = prod_config
}else {
  config = test_config
}

module.exports = config;