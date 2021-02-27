
"use strict";

const axios = require('axios-https-proxy-fix');
const https = require('https');
const fs = require('fs');

module.exports = function soapRequest(opts = {
  url: '',
  headers: {},
  xml: '',
  timeout: 10000,
  proxy: false
}) {
  const { url, headers, xml, timeout, proxy} = opts;
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
      proxy,
      httpsAgent: new https.Agent({
        pfx: fs.readFileSync('cert.pfx'),
        passphrase: '1234567'
      })
    }).then((response) => {
      resolve({
        response: {
          headers: response.headers,
          body: response.data,
          statusCode: response.status,
        },
      });
    }).catch((error) => {
      if (error.response) {
        console.error(`SOAP FAIL: ${error}`);
        reject(error.response.data);
      } else {
        console.error(`SOAP FAIL: ${error}`);
        reject(error);
      }
    });
  });
};