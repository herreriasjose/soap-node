const axios = require('axios-https-proxy-fix');
module.exports = function soapRequest(opts = {
  url: '',
  headers: {},
  xml: '',
  timeout: 10000,
  proxy: false,
}) {
  const {
    url,
    headers,
    xml,
    timeout,
    proxy,
  } = opts;
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
      proxy,
    }).then((response) => {
      resolve({
        response: {
          headers: response.headers,
          body: response.data,
          statusCode: response.status,
        },
      });
    }).catch((e) => {
      if (e.response) {
        console.error(`${e}`);
        reject(e.response.data);
      } else {
        console.error(`${e}`);
        reject(e);
      }
    });
  });
};