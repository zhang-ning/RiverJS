define('river.grammer.jbind',function(exports,require,module){

  var tool = require('river.core.tools');

  function jbind (str,scope,element){
    var value = getValue(str,scope);
    var oldValue = element.value = value || '';

    tool.buildobj(str,'.',scope.__eom__,function(obj,key){
      obj[key] = obj[key] || [];
      obj[key].push({
        element: element,
        expression: "{{"+str+"}}"
      });
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
        setValue(str,scope,newValue);
        oldValue = newValue;
        scope.apply();
      }
    }
  }

  function getValue(ns,scope){
    var result = '';
    if(!scope) throw new TypeError('value not exists');
    var key = ns.replace(/\..*/,'')
    var value = scope[key];
    if(typeof value === 'object'){
      result = getValue(ns.replace(key+'.',''),value);
    }else if(typeof value !== 'undefined'){
      result = value;
    }
    return result;
  }

  function setValue(str,scope,value){
    if(!scope) throw new TypeError('value not exists');
    var key = str.replace(/\..*/,'')
    var childscope = scope[key];
    if(typeof childscope === 'object'){
      setValue(str.replace(key+'.',''),childscope,value);
    }else{
      scope[key] = value;
    }
  }

  exports = module.exports = jbind;
});
