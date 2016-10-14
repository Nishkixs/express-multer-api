'use strict';

require('dotenv').config();

const fs = require('fs');

const filename = process.argv[2] || '';
const fileType = require('file-type');
const AWS = require('aws-sdk');

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


const mimeType = (data) => {
  return Object.assign({
  ext:'bin',
  mime: 'application/octet-stream',
}, fileType(data));
};

const parseFile = (fileBuffer) => {
  let file = mimeType (fileBuffer);
  file.data = fileBuffer;
  return file;
};

const s3 = new AWS.S3({
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  }
});


const upload = (file) => {
  // get bucket name from aws console
  const options = {
    Bucket: 'nishon',
    // attach filebuffer as a stream to send to s3
    Body: file.data,
    // allow anyoing to acces to url of the uploaded file
    ACL: 'public-read',
    // tell s3 what the mime-tpe is
    contentType: file.mime,
    // pick a filename for S3 to use for the uplaod
    Key: `test/test.${file.ext}`
  };

  return new Promise ((resolve, reject) => {
    s3.upload(options, (error, data) => {
      if (error) {
        reject(error);
      }
    resolve(data);
    });
  });
};

const logMessage = (response) => {
  // get rid of the stream for now so I can log the rest of my options
  // in the terminal without seeing the steram
 console.log(`the the response from AWS was  ${JSON.stringify(response)}`);

};




readFile(filename)
.then(parseFile)
.then(upload)
.then(logMessage)
.catch(console.error)
;
