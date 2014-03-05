define('river.grammer.jbind',function(){

  function jbind (str,scope,element,repeatscope){
    str = str.replace(/.+\./,'');
    var oldValue = element.value = repeatscope && repeatscope[str] || scope[str] || '';
    this.eom[str] = this.eom[str] || [];
    this.eom[str].push({
      element:element,
      expression:"{{"+str+"}}"
    });

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
        if(repeatscope){
          repeatscope[str] = newValue;
        } else {
          scope[str] = newValue;
        }
        oldValue = newValue;
        scope.apply();
      }
    }
  }

  return jbind;

});
