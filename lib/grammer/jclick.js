define('river.grammer.jclick', function() {
  function click (str) {
    var key = str.replace(/\(.*\)/,'');
    var fn = this.scope[key];
    var scope = this.scope;

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
      var index = Array.prototype.indexOf.call(this.node.parentNode,this.node);
    }

    this.node.onclick = function(){
      fn.apply({},args);
      scope.apply();
    };
  }
  return click;
});
