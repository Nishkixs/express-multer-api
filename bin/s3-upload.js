#!/usr/bin/env node

'use strict';

const fs = require('fs');

const filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data)=> {
      if(error) {
        return console.error(error);
      }
}
}
  console.log(`${filename} is ${data.length} bytes long`);
});