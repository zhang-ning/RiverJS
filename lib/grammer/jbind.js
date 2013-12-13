define('river.grammer.jbind',function(){

  function jbind (str){
    var scope = this.scope;
    this.node.value = scope[str];
    this.node.onkeyup = function(){
      scope[str] = this.value;
      scope.apply();
    };
  }

  return jbind;

});
