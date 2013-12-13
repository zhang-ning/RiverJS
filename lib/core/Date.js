define('river.core.Date', function() {

  var getDateByCity = function(jetleg) {
    var now = new Date();
    var local = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + parseInt(jetleg),
      now.getUTCMinutes(),
      now.getUTCSeconds());

    return {
      date: local,
      toString: function(f){
        local.toString = toString;
        return local.toString(f);
      }
    };
  };

  function toString(format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }


  return {
    getDateByCity: getDateByCity
  };
});
