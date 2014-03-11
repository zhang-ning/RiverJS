main(function(exports,require,module){
  var engine = require('river.engine');
  engine.ready(window,function(){
    engine.scan(document);
  });
});
