"use strict";

const soapRequest = require('./soaprequest');
 
const url = 'https://www1.agenciatributaria.gob.es/wlpl/BURT-JDIT/ws/VNifV2SOAP';
const headersToAdd = {
  'user-agent': '',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': '',
};

const nif = 'A95758389';
const name= 'Iberdrola';

async function verifyNif(nif, name) { 
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vnif="http://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/burt/jdit/ws/VNifV2Ent.xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <vnif:VNifV2Ent>
         <!--1 to 20000 repetitions:-->
         <vnif:Contribuyente>
            <vnif:Nif>${nif}</vnif:Nif>
            <vnif:Nombre>${name}</vnif:Nombre>
         </vnif:Contribuyente>
      </vnif:VNifV2Ent>
   </soapenv:Body>
   </soapenv:Envelope>`;
    const { response } = await soapRequest({ url: url, headers: headersToAdd, xml: xml, timeout: 2000 });
    const { headers, body, statusCode } = response;
    // console.log(headers);
    // console.log(body);
    // console.log(statusCode);
    console.log(body);
}

verifyNif(nif, name); 