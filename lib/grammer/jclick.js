define('river.grammer.jclick', function(exports,require,module) {
  function click (str,scope,element) {
    var f = str.replace(/\(.*\)/,'');
    var fn = scope[f];

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
      //Array.prototype.indexOf.call(this.node.parentNode,this.node);
    }

    var argsdata = [];
    for (var i = 0, len = args.length; i < len; i++) {
      argsdata[i] = scope[args[i]]
    }

    var eom = this.eom;
    element.onclick = function(e){
      fn.apply(element,argsdata);
      scope.apply();
    };
  }

  exports = module.exports = click;
});
