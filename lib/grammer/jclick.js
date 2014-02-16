define('river.grammer.jclick', function() {
  function click (str,scope,element) {
    var key = str.replace(/\(.*\)/,'');
    var fn = scope[key];

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
      var index = Array.prototype.indexOf.call(this.node.parentNode,this.node);
    }

    var eom = this.eom;
    element.onclick = function(){
      if(args.length){
        console.log(eom);
      }
      fn.apply({},args);
      scope.apply();
    };
  }
  return click;
});
