var fs = require('fs');

var santander = requisre('../santander.js');
console.dir(santander);
var encoding = "ascii"; //utf8

var entries = [];

var _santander = new santander(entries);

function output(){
  var csvFileData = "Date, Description, Amount, Balance\n";

  entries.forEach(function(e){
    csvFileData += e.date + ",\"" + e.description + "\"," + e.amount + "," + e.balance + "\n";
  });
  fs.writeFile(process.argv[3], csvFileData, encoding, function(){});
}

output();
