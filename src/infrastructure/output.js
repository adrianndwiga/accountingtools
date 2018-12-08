module.exports = function(list, status, formatter){
    var t = {};
    var list = list;
    var inputs = 0;
    var status = status;
    var formatter = formatter;

    t.processList = function(item){

        var addItemToList = true;

        list.forEach(function(o){
            if(
                o.dates.start === item.dates.start &&
                o.dates.end === item.dates.end &&
                o.title === item.title
            ){
                addItemToList = false;
                item.list.forEach(function(x){
                    o.list.push(x);
                });
            }
        });
  
        if(addItemToList){
            list.push(item);
        }
        

        status.position = status.position + 1;

        if(status.position === status.totalFiles){
            t.onComplete();
        }
    };

    t.addInputs = function(){
        inputs += inputs + 1;
    };

    t.onComplete = function(){
        formatter.format(list);
    };

    return t;
};