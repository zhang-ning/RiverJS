define('river.grammer.jclick', function() {
  function click (str,scope,element) {
    var key = str.replace(/\(.*\)/,'');
    var fn = scope[key];

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
      //Array.prototype.indexOf.call(this.node.parentNode,this.node);
    }

    var argsdata = [];
    /*
    for (var i = 0, len = args; i < len; i++) {
      var item = scope[args[i]] ? scope.__last__[args[i]] : scope[args[i]] ;
      argsdata.push(item);
    }*/

    //to-do hot-fix
    argsdata = [scope.__last__ || scope];

    var eom = this.eom;
    element.onclick = function(e){
      fn.apply(element,argsdata);
      scope.apply();
    };
  }
  return click;
});
