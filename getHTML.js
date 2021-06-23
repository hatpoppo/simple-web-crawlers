const https = require('https');
const {JSDOM} = require("jsdom"); //jqueryをつかうために
const jQuery = require("jquery"); //趣旨のとおり、DOM走査するために

const options={
  host:'www.digitalocean.com',
  path:'/community/tags/api',
  method:'GET',
  Headers:{
    'Accept':'text/html,application/xhtml+xml,application/xml;'
  }
};

let request = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('close', () => {
    console.log('Retrieved all data');
    const dom = new JSDOM(data);
    const $ = jQuery(dom.window);
    const $doc = $(dom.window.document);
    const sample = $('ul.utility > li');
    let items = $('.vList');
    console.log(sample); 
    sample.each(function(index){
      console.log(index + ": " + $(this).text())
    })
    console.log(items);
  });
});

request.end();

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});