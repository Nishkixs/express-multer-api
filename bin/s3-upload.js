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

  // don't actually upload just pass the data down the promise chain
  return Promise.resolve(options);
};

const logMessage = (upload) => {
  // get rid of the stream for now so I can log the rest of my options
  // in the terminal without seeing the steram
  delete upload.Body;
 console.log(`the upload options are ${JSON.stringify(upload)}`);
};




readFile(filename)
.then(parseFile)
.then(upload)
.then(logMessage)
.catch(console.error)
;
