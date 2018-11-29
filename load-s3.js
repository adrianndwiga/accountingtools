const aws = require('aws-sdk');
const santander = require('./lib/santander');
const getQueryParameters = require('./getQueryParameters');

const s3 = new aws.S3();

const props = getQueryParameters();
const params = {
    Bucket: props.bucket, 
    Key: props.key
   };

const stream = s3.getObject(params).createReadStream();
stream.setEncoding('ascii');
let entries = {list: []};
santander(entries, { start: props.start, end: props.end }, props.includes, stream, (data) => {
    console.log(data.list);
})
