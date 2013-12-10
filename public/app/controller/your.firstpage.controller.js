define('your.firstpage.controller',function(){
  return function(){
    var scope = this;
    scope.name = "Jonathan";

    scope.changeName = function(){
      if('Jonathan' === scope.name){
        scope.name = 'River';
      }else{
        scope.name = 'Jonathan';
      }
    };
  };
});
