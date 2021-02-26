const soapRequest = require('./soaprequest');
const fs = require('fs');

// example data
const url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso';
const headersToAdd = {
  'user-agent': '',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': '',
};
const xml = fs.readFileSync('numbertoworld.xml', 'utf-8');

// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: headersToAdd, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  console.log(body);
  console.log(statusCode);
})();