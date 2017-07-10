var fs = require('fs');
var _dateRange = require('../infrastructure/dateRange.js');
var _inclusionList = require('../infrastructure/inclusionList.js');

module.exports = function(entries, dates, includes, inputFile){
var entry = {};
var encoding = "ascii"; //utf8

// var datePart = {
//   day: 0,
//   month: 1,
//   year: 2
// };
//
// var _date = function(value){
//   return {
//     value: value,
//     toDate: function(){
//       var dateParts = this.value.split("/");
//       return new Date(dateParts[datePart.year] + "-" + dateParts[datePart.month] + "-" + dateParts[datePart.day]);
//     }
//   };
// };

// var dateRange = {
//   start: new _date(dates.start),
//   end: new _date(dates.end),
//   isInDateRange: function(value){
//     var v = new _date(value.trim());
//     return v.toDate() >= this.start.toDate() && v.toDate() <= this.end.toDate();
//   }
// };

var dateRange = new _dateRange(dates);

// var inclusionList = {
//   list: includes,
//   isIncluded: function(value){
//     var ret = false;
//
//     this.list.forEach(function(item){
//       if(item.toLowerCase && value.toLowerCase().replaceAll(" ", "").includes(item.toLowerCase().replaceAll(" ", ""))){
//         ret = true;
//         return;
//       }
//     });
//
//     return ret;
//   },
// };
var inclusionList = new _inclusionList(includes);

fs.readFile(inputFile, encoding, function(error, data){
  data.split('\n').forEach(function(l){
    if(l.startsWith("Date:")){
      entry.date = l.split(":")[1].trim();
    }
      if(l.startsWith(  "Description:")){
      entry.description = l.split(":")[1].trim();
    }
    if(l.startsWith("Amount:")){
      entry.amount = parseFloat(l.split(":")[1].trim()) * -1;
    }
    if(l.startsWith("Balance:")){
      entry.balance = l.split(":")[1].trim();
      if(inclusionList.isIncluded(entry.description) &&
          dateRange.isInDateRange(entry.date)){
        entries.push(entry);
      }
      entry = {};
    }
  });
});
};
