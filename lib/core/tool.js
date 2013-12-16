define('river.core.tools', function() {
  var toString = Object.prototype.toString;
  var tools = {
    inherit: function(target,source) {
      var F = function() {
        for (var x in target) {
          if(target.hasOwnProperty && target.hasOwnProperty(x)){
            this[x] = target[x];
          }else{
            F.prototype[x] = target[x];
          }
        }
      };
      for(var y in source){
        F.prototype[y] = source[y];
      }
      //F.prototype = source;
      return new F();
    },
    compile:function(str){
        var container = document.createElement('div');
            container.innerHTML = str;
        return container.childNodes[0];
    },
    guid: function() {
      var uid = "$$";
      for (var i = 1; i <= 8; i++) {
        var n = Math.floor(Math.random() * 16).toString(16);
        uid += n;
        if ((i == 3) || (i == 5))
          uid += "-";
      }
      return uid;
    },
    /**
     * it's for array loop
     */
    loop: function(array, fn) {
      var context = {};
      for (var i = 0; i < array.length; i++) {
        fn.call(context, array[i], i);
      }
    },
    /**
     * it's for object loop,but will not loop in prototype
     */
    each: function(obj, fn) {
      var context = {};
      for (var x in obj) {
        if (obj.hasOwnProperty && obj.hasOwnProperty(x)) {
          fn.call(context, obj[x], x);
        }
      }
    },
    log: function() {
      if (console) {
        Function.apply.call(console.log, console, arguments);
      }
    },
    isArray: function(array) {
      return toString.apply(array) === '[object Array]';
    },
    isObject: function(obj) {
      return obj !== null && typeof obj === 'object';
    },
    isFunction: function(obj) {
      return typeof obj === 'function';
    },
    isString: function(str) {
      return typeof str === 'string';
    },
    isNumber: function(no) {
      return typeof no === 'number';
    }
  };

  return tools;
});
