define('river.grammer.jon', function() {
  function on (str,scope,element) {
    var expression = str.replace(/\(.*\)/,'');

    var type = expression.replace(/\s*[\||:].*/,'');
    var key  = expression.replace(/.*[\||:]\s*/,'');
    var fn = scope[key];

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
    }

    var event = 'on' + type;

    element[event] = function(e){
      var argsdata = [];
      for (var i = 0, len = args.length; i < len; i++) {
        var item = scope[args[i]] ? scope[args[i]] : '';//args[i];
        argsdata.push(item);
      }
      fn.apply(element,[e].concat(argsdata));
      scope.apply();
    };
  }
  return on;
});
