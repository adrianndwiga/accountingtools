import * as  aws from 'aws-sdk';
import santander from './lib/santander';
import { barclays } from './lib/barclays';
import { getQueryParameters } from './getQueryParameters';

const s3 = new aws.S3();

const props = getQueryParameters();
const params = {
    Bucket: props.bucket, 
    Key: props.key
   };

const stream = s3.getObject(params).createReadStream();
stream.setEncoding('ascii');
let entries = {list: []};
if (props.key.includes('barclays')) {
    barclays(entries, { start: props.start, end: props.end }, props.includes, stream, (data) => {
        console.log(JSON.stringify(data));
        console.log(data.list.map(s => s.amount).reduce((a, b) => a + b));
    });
} else {
    santander(entries, { start: props.start, end: props.end }, props.includes, stream, (data) => {
        console.log(data.list.map(s => s.amount).reduce((a, b) => a + b));
    });
}
