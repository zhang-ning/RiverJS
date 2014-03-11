define('river.grammer.markdown',function(exports,require,module){
  function markdown(str,scope,element){
    scope.onchange('input',function(value){
      element.innerHTML = marked(value);
    });
  }
  module.exports = exports = markdown;
})
