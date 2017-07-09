var fs = require('fs');
var _dateRange = require('./infrastructure/dateRange.js');
var _inclusionList = require('./infrastructure/inclusionList.js');

module.exports = function(entries, dates, includes, inputFile){
  var model = {
    Date: "",
    Description: "",
    Amount: "",
    Balance: ""
  };


  var writeFile = function(){

  };

  var encodings = {
    utf8: "utf8",
    ascii: "ascii"
  };

  var encoding = "utf8";//"ascii"; //utf8
  var input = inputFile;

  var dateRange = new _dateRange(dates);
  var inclusionList = new _inclusionList(includes);

  fs.readFile(input, encoding, function(error, data){
    data.split('\n').forEach(function(row){

      var items = row.split(",");
      if(items.length === 6 && dateRange.isInDateRange(items[1])
          && inclusionList.isIncluded(items[5])){
        var entry = {
          date: items[1],
          description: items[5],
          amount: parseFloat(items[3]) * -1
        };
          entries.push(entry);
      }
    });
  });
};
