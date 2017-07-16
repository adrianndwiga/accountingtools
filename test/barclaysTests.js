var mockery = require('mockery');
var sinon = require("sinon");
var chai = require('chai');
var assert = chai.assert;

describe("barclays", function(){
  var account,
    barclays,
    inputFile = "/input/barclays june 2017.csv",
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
        t.callback(error, data);
      }

      return t;
    }();

  var entries = {list:[]};
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
    barclays = require('../lib/barclays');

  });

  beforeEach(function(){
    // process.argv.push(inputFile);
    console.log(inputFile);
    account = new barclays(entries, dates, includes, inputFile, function(){});
  });

  it("read file was called", function(){
    console.log(inputFile);
    fs.readFile.withArgs(inputFile, "utf8");
  });

  describe("when i invoke callback with transaction on the first day in date range", function(){
    var data = "Number,Date,Account,Amount,Subcategory,Memo\n" +
",26/06/2017,20-62-09 10839779,-10.99,PAYMENT,SKY RESTAURANT        ON 23 JUN          BCC";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has one entry", function(){
      assert.equal(entries.list.length, 1);
    });

    it("has date", function(){
      assert.equal(entries.list[0].date, "26/06/2017");
    });

    it("has description", function(){
      assert.equal(entries.list[0].description, "SKY RESTAURANT        ON 23 JUN          BCC");
    });

    it("has amount", function(){
      assert.equal(entries.list[0].amount, "10.99");
    });

    afterEach(function(){
      entries = {list: []};
    });
  });

});
