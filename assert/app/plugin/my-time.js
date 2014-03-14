define('river.grammer.my-time', function() {
  var $Date = this.need('river.core.Date');

  return function() {

    var scope = this.scope;
    //if there is no 'Controler' point to 'scope',this.scope will be the rootScope;

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
