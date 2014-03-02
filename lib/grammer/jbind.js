define('river.grammer.jbind',function(){

  function jbind (str,scope,element,repeatscope){
    scope = repeatscope || scope;
    var oldValue = element.value = scope[str] || '';

    var interval;

    element.onfocus = function(){
      var ele = this;
      interval = setInterval(function(){
        watch(ele.value);
      },30);
    };

    element.onblur = function(){
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
