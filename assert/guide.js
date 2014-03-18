define('river.grammer.datetime',function(exports,require,module){
  //notic the namespace river.grammer, here is a typo, not grammar
  exports = module.exports = datetime;

  function datetime(str,scope,element){
    //str is the value of your custom attribute 
    //here we use it as parameters for searching data in scope
    var key = str;
    element.innerHTML = (new Date(scope[key])).toLocaleString();
  }
})


define('datetime.ctrl',function(exports,require,module){
  exports.time = '2014-03-18T07:19:20.047Z';
})


define('river.grammer.my-time', function(exports,require,module) {
  var $Date = require('river.core.Date');

  exports = module.exports = function(str,scope,element) {

    var timezone = {
      bj: '+8',
      pa: '-7'
    };

    function update() {
      var format = 'yyyy-MM-dd h:mm:ss';
      scope.Beijing = $Date.getDateByCity(timezone.bj).toString(format);
      scope.PaloAuto = $Date.getDateByCity(timezone.pa).toString(format);
      scope.apply();
    }

    var timeID = setInterval(function() {
      update();
    }, 1000);

    update();

    scope.stop = function() {
      clearInterval(timeID);
    };
  };
});
