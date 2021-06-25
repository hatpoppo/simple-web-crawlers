const https = require('https');
const {JSDOM} = require("jsdom"); //jqueryをつかうために
const jQuery = require("jquery"); //趣旨のとおり、DOM走査するために
const iconv = require('iconv-lite');

const options={
  host:'futureys.tokyo',
  path:'/how-permission-should-be-set-for-developing-inside-a-container-using-wsl-2/',
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

  let data = [];

  res.on('data', (chunk) => {
    data.push(chunk);
  });

  res.on('close', () => {
    console.log('Retrieved all data');
    const decodedBody = iconv.decode(Buffer.concat(data), 'UTF8');
    const dom = new JSDOM(decodedBody);
    const $ = jQuery(dom.window);
    const sample = $('.wp-block-table tr');
    sample.each(function(index){
      // console.log(index + ": " + $(this).text())
      $(this).children().each(function(index1){
        console.log(index + " " + index1 + ": " + $(this).text())
      })
    })
  });
});

request.end();

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});