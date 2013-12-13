define('river.grammer.jChange', function() {
  function change (str) {
    var fn = this.scope[str];
    var scope = this.scope;

    this.node.onchange = function(){
      fn.call({},this.value);
      scope.apply();
    };
  }
  return change;
});
