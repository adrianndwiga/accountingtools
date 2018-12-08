String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var inclusionList = function(includes){
  var t = {};

  t.list = includes;

  t.isIncluded = function(value){
    var ret = false;

    this.list.forEach(function(item){
      if(item.toLowerCase && value.toLowerCase().replaceAll(" ", "").includes(item.toLowerCase().replaceAll(" ", ""))){
        ret = true;
        return;
      }
    });

    return ret;
  };

  return t;
};

module.exports = inclusionList;
