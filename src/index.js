var fs = require('fs');

//var x = function() {}
// console.log('hello');
// var entries = [];
// var entry = {};
// var encoding = "ascii"; //utf8
// fs.readFile(process.argv[2], encoding, function(error, data){
//   data.split('\n').forEach(function(l){
//     if(l.startsWith("Date:")){
//       entry.date = l.split(":")[1];
//     }
//     if(l.startsWith("Description:")){
//       entry.description = l.split(":")[1];
//     }
//     if(l.startsWith("Amount:")){
//       entry.amount = l.split(":")[1];
//     }
//     if(l.startsWith("Balance:")){
//       entry.balance = l.split(":")[1];
//       entries.push(entry);
//       entry = {};
//     }
//   });
//   var csvFileData = "Date, Description, Amount, Balance\n";
//
//   entries.forEach(function(e){
//     csvFileData += e.date + ",\"" + e.description + "\"," + e.amount + "," + e.balance + "\n";
//   });
//   fs.writeFile(process.argv[3], csvFileData, encoding, function(){});
// });

process.argv.forEach(function(arg){
  console.log(arg);
});
