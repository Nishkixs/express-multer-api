'use strict';

const fs = require('fs');

const filename = process.argv[2] || '';
const fileType = require('file-type');

const readFile = (filename) => {
 return new Promise((resolve, reject) => {
   fs.readFile(filename, (error, data) => {
     if (error) {
       reject(error);
     }

     resolve(data);
   });
 });
};

const logMessage = (data) => {
  let typeData = fileType(data);
 console.log(`${filename} is ${data.length} bytes long ${typeData}`);
};

readFile(filename)
.then(logMessage)
.catch(console.error)
;
