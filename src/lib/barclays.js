import * as fs from 'fs';
import _dateRange from '../infrastructure/dateRange.js';
import _inclusionList from '../infrastructure/inclusionList.js';

export function barclays(entries, dates, includes, inputFile, success){
  const encoding = "utf8"; //"ascii"; //utf8
  const input = inputFile;

  const dateRange = new _dateRange(dates);
  const inclusionList = new _inclusionList(includes);

  function transform(error, data) {
    data.split('\n').forEach(function(row){
  
      const items = row.split(","); 
      if(items.length === 6 
          && dateRange.isInDateRange(items[1])
          && inclusionList.isIncluded(items[5])){
        const entry = {
          date: items[1],
          description: items[5],
          amount: parseFloat(items[3]) * -1
        };
          entries.list.push(entry);
      }
    });
    success(entries);
  }

  if (typeof(inputFile) === 'string') {
    fs.readFile(input, encoding, transform);
  } else {
    let data = '';
    inputFile.on('data', chunk => data += chunk);
    inputFile.on('end', () => transform(null, data));
  }
};
