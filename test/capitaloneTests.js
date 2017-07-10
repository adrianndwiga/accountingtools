var mockery = require('mockery');
var sinon = require("sinon");
var chai = require('chai');
var assert = chai.assert;

describe("capitalone", function(){
  var data = "Transaction Date, Posting Date, Billing Amount, Merchant, Merchant Town , Merchant County , Merchant Postcode , Reference Number , Debit/Credit Flag , SICMCC Code\n" +
              "29/06/2017,30/06/2017,£5.00,SKY RESTAURANT,STAFF TOP UP,,EH54 7BW, \"55504437180252128254297\",D,5812"

  var account,
    capitalone,
    inputFile = "/input/capital one june 2017.csv",
    fs = function(){
      var t = {};

      t.readFile = function(file, encoding, callback){
          t.file = file;
          t.encoding = encoding;
          t.callback = callback;
      };

      t.readFile.withArgs = function(file, encoding){
          assert.equal(file, t.file);
          assert.equal(encoding, t.encoding);
      };

      t.readFile.invokeCallback = function(error, data){
        console.dir(data);
        t.callback(error, data);
      }

      return t;
    }();

  var entries = [];
  var dates = {
    start: "01/06/2017",
    end: "30/06/2017"
  };
  var includes = ["sky restaurant"];

  before(function(){
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    mockery.registerMock('fs', fs);
    capitalone = require('../lib/capitalone');

  });

  beforeEach(function(){
    // process.argv.push(inputFile);
    // console.log(inputFile);
    account = new capitalone(entries, dates, includes, inputFile);
  });

  it("read file was called", function(){
    // console.log(inputFile);
    fs.readFile.withArgs(inputFile, "utf8");
  });

  describe("when i invoke callback with transaction on the first day in date range", function(){
    //var data = "Date: 01/06/2017\nDescription: virgin media\nAmount: -90.99\nBalance: 900";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has one entry", function(){
      assert.equal(entries.length, 1);
    });

    it("has date", function(){
      assert.equal(entries[0].date, "29/06/2017");
    });

    it("has description", function(){
      assert.equal(entries[0].description, "SKY RESTAURANT");
    });

    it("has amount", function(){
      assert.equal(entries[0].amount, "5");
    });

    afterEach(function(){
      entries = [];
    });
  });

});
