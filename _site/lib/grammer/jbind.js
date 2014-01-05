define('river.grammer.jbind',function(){

  function jbind (str){
    var scope = this.scope;
    var oldValue = this.node.value = scope[str];

    var interval;

    this.node.onfocus = function(){
      var ele = this;
      interval = setInterval(function(){
        watch(ele.value);
      },30);
    };

    this.node.onblur = function(){
      clearInterval(interval);
    };

    function watch(newValue){
      if(newValue !== oldValue){
        scope[str] = newValue;
        oldValue = newValue;
        scope.apply();
      }
    }
  }

  return jbind;

});
