const net = require('net');
const fs = require('fs');
const arg = process.argv.slice(2);
const request = require('request');


const conn = net.createConnection({
  host: `${arg[0]}`,
  port: 80
});
conn.setEncoding('UTF8');

conn.on('connect', () => {
  console.log('Connected to server!');

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${arg} \r\n`);
  conn.write(`\r\n`);

});

request(`http://${arg[0]}`, (error, response, body) => {
  if (arg[1] === '') {
    console.log('Please Enter a Valid File Name.');
    return;
  }

  if (response.statusCode !== 200) {
    return error;
  }

  writeFile(error, arg[1]);
  writeFile(response && response.statusCode, arg[1]);
  writeFile(body,arg[1]);
  console.log(`Downloaded and saved ${body.length} bytes to ${arg[1]}`);

});

const writeFile = function(data,location) {
  fs.writeFile(location,data,
    err =>  {
      if (err) {
        console.error(err);
        return;
      }
    });
  
};


