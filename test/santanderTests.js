var mockery = require('mockery');
var sinon = require("sinon");
var chai = require('chai');
var assert = chai.assert;

describe("santander", function(){
  var account,
    santander,
    inputFile = "/output/",
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

  var entries = [];
  var dates = {
    start: "01/06/2017",
    end: "30/06/2017"
  };
  var includes = ["virgin media"];

  before(function(){
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    mockery.registerMock('fs', fs);
    santander = require('../lib/santander');

  });

  beforeEach(function(){
    process.argv.push(inputFile);
    account = new santander({list: entries}, dates, includes, inputFile, function(){});
  });

  it("read file was called", function(){
    fs.readFile.withArgs(inputFile, "ascii");
  });

  describe("when i invoke callback with transaction on the first day in date range", function(){
    var data = "Date: 01/06/2017\nDescription: virgin media\nAmount: -90.99\nBalance: 900";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has one entry", function(){
      assert.equal(entries.length, 1);
    });

    it("has date", function(){
      assert.equal(entries[0].date, "01/06/2017");
    });

    it("has description", function(){
      assert.equal(entries[0].description, "virgin media");
    });

    it("has amount", function(){
      assert.equal(entries[0].amount, "90.99");
    });

    it("has balance", function(){
      assert.equal(entries[0].balance, "900");
    });

    afterEach(function(){
      entries = [];
    });
  });

  describe("when i invoke callback with transaction on the last day in date range", function(){
    var data = "Date: 30/06/2017\nDescription: virgin media 2 \nAmount: -90.99\nBalance: 900";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has one entry", function(){
      assert.equal(entries.length, 1);
    });

    it("has date", function(){
      assert.equal(entries[0].date, "30/06/2017");
    });

    it("has description", function(){
      assert.equal(entries[0].description, "virgin media 2");
    });

    it("has amount", function(){
      assert.equal(entries[0].amount, "90.99");
    });

    it("has balance", function(){
      assert.equal(entries[0].balance, "900");
    });

    afterEach(function(){
      entries = [];
    });
  });

  describe("when I invoke callback with transaction is not in the date range", function(){
    var data = "Date: 01/07/2017\nDescription: virgin media\nAmount: -90.99\nBalance: 900";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has zero entry", function(){
      assert.equal(entries.length, 0);
    });

    afterEach(function(){
      entries = [];
    });
  });

  describe("when i invoke callback with transaction  where description is not in inclusion list", function(){
    var data = "Date: 30/06/2017\nDescription: british telecom \nAmount: -90.99\nBalance: 900";

    beforeEach(function(){
      fs.readFile.invokeCallback({}, data);
    });

    it("has zero entry", function(){
      assert.equal(entries.length, 0);
    });

    afterEach(function(){
      entries = [];
    });
  });
});
