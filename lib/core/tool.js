define('river.core.tools', function() {
  var toString = Object.prototype.toString;
  /**
   * @namespace river.core.tools
   */

  function inherit(target,source) {
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
    var f = new F();
    for(var z in f){
      target[z] = f[z];
    }
    return target;
  }

  function compile(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.childNodes[0];
  }

  function guid() {
    var uid = "$$";
    for (var i = 1; i <= 8; i++) {
      var n = Math.floor(Math.random() * 16).toString(16);
      uid += n;
      if ((i == 3) || (i == 5))
        uid += "-";
    }
    return uid;
  }

    /**
     * it's for array loop
     */
  function loop(array, fn) {
    var context = {};
    for (var i = 0; i < array.length; i++) {
      fn.call(context, array[i], i);
    }
  }

  /**
   * it's for object loop,but will not loop in prototype
   */
  function each(obj, fn) {
    var context = {};
    for (var x in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(x)) {
        fn.call(context, obj[x], x);
      }
    }
  }

  function type(name,item) {
    return window.Object.prototype.toString.call(item) === '[object '+ name +']';
  }


  /**
   * clone in deep
   * @api:public
   * @param:{object} target
   * @param {object} source 
   */
  function clone(target,source){
    for(var x in source){
      var isObject = type('Object',source[x])
        , isArray  = type('Array', source[x])
        , hasChild = isObject || isArray;

      if(hasChild){
        target[x] = isObject ? {} : [];
        clone(target[x],source[x]);
      }else{
        target[x] = source[x];
      }
    }
    return target;
  }


  /**
   * diff two object/array
   * @api:public
   * @param:{object} target
   * @param {object} source
   */
  function diff(target,source){
    this._diffFlag = true;
      for(var x in source){
        var isObject = type('Object',source[x]) || type('Array',source[x]); 
        if(isObject && target){
          diff.call(this,target[x],source[x]);
        }else{
          if(!target){
            this._diffFlag = false;
            return;
          }
          if(target[x] != source[x]){
            this._diffFlag = false;
          }
        }
      }
      return this._diffFlag;
  }

  function expect(source){
    var isValue = typeof source == 'string' || typeof source == 'number' || typeof source == 'boolean'
      , isObject = typeof source != 'function';
    
    function equal(target) {
      if(isValue){
        return source == target;
      }else if(isObject){
        return diff.call({},target,source) && diff.call({},source,target);
      }
    }

    return {
      toEqual:equal
    }
  }

  var exports = {
    inherit    : inherit,
    compile    : compile,
    guid       : guid,
    loop       : loop,
    each       : each,
    clone      : clone,
    expect     : expect,
    isArray    : function(array) {return type('Array',array);},
    isObject   : function(obj) { return type('Object',obj);},
    isFunction : function(obj) { return type('Function',obj); },
    isString   : function(str) { return type('String',str); },
    isNumber   : function(no) { return type('Number',no); }
  };

  return exports;
});
