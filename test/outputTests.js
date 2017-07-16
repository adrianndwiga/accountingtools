var mockery = require('mockery');
var sinon = require("sinon");
var chai = require('chai');
var assert = chai.assert;

describe("output", function(){
    var output, Output = require('../infrastructure/output.js');
    var status, formatter;

    before(function(){
        // formatter.format.
    });

    beforeEach(function(){
        outputList = [];
        status = {totalFiles: 1, position: 0};
        formatter = {
            format: sinon.spy()
        };
        output = new Output(outputList, status, formatter);
    });

    afterEach(function(){
        outputList = [];        
    })

    describe("should process list", function(){
        describe("should add transaction to list", function(){
            var returnedList = {
                    title: "a-title",
                    dates: {
                        start: "01/07/2017",
                        end: "31/07/2017"
                    },
                    list: [
                        {date: "01/07/2017", description: "description", amount: 29.99}
                    ]
                };

            beforeEach(function(){
                output.processList(returnedList)
            });

            it("should have transactions", function(){
                assert.equal(outputList.length, 1);
                assert.equal(outputList[0].dates.start, returnedList.dates.start);
                assert.equal(outputList[0].dates.end, returnedList.dates.end);
                assert.equal(outputList[0].list.length, returnedList.list.length);
                assert.equal(outputList[0].list[0].date, returnedList.list[0].date);
                assert.equal(outputList[0].list[0].description, returnedList.list[0].description);
                assert.equal(outputList[0].list[0].amount, returnedList.list[0].amount);
            });
        });

        describe("should group transactions", function(){
            var returnedList = {
                    title: "a-title",
                    dates: {
                        start: "01/07/2017",
                        end: "31/07/2017"
                    },
                    list: [
                        {date: "01/07/2017", description: "description", amount: 29.99}
                    ]
                };
            var returnedList1 = {
                    title: "a-title",
                    dates: {
                        start: "01/07/2017",
                        end: "31/07/2017"
                    },
                    list: [
                        {date: "02/07/2017", description: "description1", amount: 49.99}
                    ]
                };

            beforeEach(function(){
                returnedList = {
                        title: "a-title",
                        dates: {
                            start: "01/07/2017",
                            end: "31/07/2017"
                        },
                        list: [
                            {date: "01/07/2017", description: "description", amount: 29.99}
                        ]
                    };
                returnedList1 = {
                        title: "a-title",
                        dates: {
                            start: "01/07/2017",
                            end: "31/07/2017"
                        },
                        list: [
                            {date: "02/07/2017", description: "description1", amount: 49.99}
                        ]
                    };

                outputList = [];
                formatter = {
                    format: sinon.spy()
                };                
                status = {totalFiles: 2, position: 0};
                output = new Output(outputList, status, formatter);
                output.processList(returnedList);
                output.processList(returnedList1);
            });

            it("should have transactions", function(){
                assert.equal(outputList.length, 1);
                assert.equal(outputList[0].dates.start, returnedList.dates.start);
                assert.equal(outputList[0].dates.end, returnedList.dates.end);
                assert.equal(outputList[0].list.length, 2);
                assert.equal(outputList[0].list[0].date, returnedList.list[0].date);
                assert.equal(outputList[0].list[0].description, returnedList.list[0].description);
                assert.equal(outputList[0].list[0].amount, returnedList.list[0].amount);

                assert.equal(outputList[0].dates.start, returnedList.dates.start);
                assert.equal(outputList[0].dates.end, returnedList.dates.end);
                assert.equal(outputList[0].list.length, 2);
                assert.equal(outputList[0].list[1].date, returnedList1.list[0].date);
                assert.equal(outputList[0].list[1].description, returnedList1.list[0].description);
                assert.equal(outputList[0].list[1].amount, returnedList1.list[0].amount);
            });

            it("should format output", function(){
                sinon.assert.called(formatter.format.withArgs(outputList));
            });
        });
    });

});