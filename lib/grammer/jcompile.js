define('river.grammer.jcompile',function(exports,require,module){
  return function(str,scope,element){
    //jcompile should never be used when sub tag structutor contain any other grammer tag,cause it will be totally replace by innnerHTML.
    var key = element.textContent.replace(/.*{{|}}.*/,'');
    var before = element.textContent.replace(/{{.*/,'');
    var after = element.textContent.replace(/.*}}/,'');
    scope.onchange(key,function(value){
      element.innerHTML = before + value + after;
    });
  };
});
