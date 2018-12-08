var datePart = {
  day: 0,
  month: 1,
  year: 2
};

var _date = function(value){
  return {
    value: value,
    toDate: function(){
      var dateParts = this.value.split("/");
      return new Date(dateParts[datePart.year] + "-" + dateParts[datePart.month] + "-" + dateParts[datePart.day]);
    }
  };
};

var dateRange = function(dates){
  var t = {};

  t.start = new _date(dates.start);
  t.end = new _date(dates.end);

  t.isInDateRange = function(value){
    var v = new _date(value.trim());
    return v.toDate() >= this.start.toDate() && v.toDate() <= this.end.toDate();
  };

  return t;
};

module.exports = dateRange;
