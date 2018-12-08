var fs = require('fs');
var _dateRange = require('../infrastructure/dateRange.js');
var _inclusionList = require('../infrastructure/inclusionList.js');

module.exports = function(entries, dates, includes, inputFile, success){
  var dateRange = new _dateRange(dates);
  var inclusionList = new _inclusionList(includes);
  var encoding = "utf8";//"ascii"; //utf8

  fs.readFile(inputFile, encoding, function(error, data){
    data.split('\n').forEach(function(row){

      var items = row.split(",");
      if(items.length === 10 && dateRange.isInDateRange(items[0])
          && inclusionList.isIncluded(items[3])){
          var entry = {
            date: items[0],
            description: items[3],
            amount: parseFloat(items[2].replace("£", ""))
          };
          entries.list.push(entry);
      }
    });
    success(entries);
  });
};
