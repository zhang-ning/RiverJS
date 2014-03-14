define('your.firstpage.controller',function(exports,require,module){
  exports.name = 'Jonathan';
  exports.changeName = function(){
    if('Jonathan' === exports.name){
      exports.name = 'River';
    }else{
      exports.name = 'Jonathan';
    }
  }
});
