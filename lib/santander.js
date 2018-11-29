var fs = require('fs');
var _dateRange = require('../infrastructure/dateRange.js');
var _inclusionList = require('../infrastructure/inclusionList.js');

module.exports = function(entries, dates, includes, inputFile, success){
  var entry = {};
  var encoding = "ascii";
  var dateRange = new _dateRange(dates);
  var inclusionList = new _inclusionList(includes);

  function transform(error, data){
    data.split('\n').forEach(function(l){
      if(l.startsWith("Date:")){
        entry.date = l.split(":")[1].trim();
      }
        if(l.startsWith(  "Description:")){
        entry.description = l.split(":")[1].trim();
      }
      if(l.startsWith("Amount:")){
        entry.amount = parseFloat(l.split(":")[1].trim()); // * -1;
      }
      if(l.startsWith("Balance:")){
        entry.balance = l.split(":")[1].trim();
        if(inclusionList.isIncluded(entry.description) &&
            dateRange.isInDateRange(entry.date)){
          entries.list.push(entry);
        }
        entry = {};
      }
    });
    success(entries);
  }; 

  if (typeof(inputFile) === 'string') {
    fs.readFile(inputFile, encoding, transform);
  } else {
    let data = '';
    inputFile.on('data', chunk => data += chunk);
    inputFile.on('end', () => transform(null, data));
  }
};
