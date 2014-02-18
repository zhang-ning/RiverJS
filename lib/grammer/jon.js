define('river.grammer.jon', function() {
  function on (str,scope,element,data) {
    var expression = str.replace(/\(.*\)/,'');

    var type = expression.replace(/\s*\|.*/,'');
    var key  = expression.replace(/.*\|\s*/,'');
    var fn = scope[key];

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
      //Array.prototype.indexOf.call(this.node.parentNode,this.node);
    }

    var eom = this.eom;

    var event = 'on' + type;

    element[event] = function(event){
      fn.apply(element,[event,data]);
      scope.apply();
    };
  }
  return on;
});
