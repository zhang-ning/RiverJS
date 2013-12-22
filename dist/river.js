/* 
 * all rights resorved by hunter.dding@gmail.com @猎人豆豆 @hunter.dding
 * please notice that the define,main are occupied as gloable variable
 * but most of time you only need to use define with CMD stand.
 * river.js by Jonathan version 13.11 
 */
var _$river = {
  // module define and run api
  sandbox: function() {
    var boxes = {};
    return {
      create: function(key, fn) {
        key = key.toLowerCase();
        boxes[key] = fn;
      },
      run: function(fn) {
        var context = {
          need: function(key) {
            key = key.toLowerCase();
            return boxes[key] && boxes[key].call(context) || undefined;
          }
        };
        fn.call(context);
      }
    };
  }
};
_$river.module = _$river.sandbox();

/*jshint unused:false */
var define = _$river.module.create;
var main = _$river.module.run;

define('river.engine',function() {

  var me = this,
    tool = me.need('river.core.tools');
  function loadGrammer(key) {
    return me.need('river.grammer.' + key);
  }

  // this reg is for math {{ **.** }} type expression
  var reg = /.*{{\s*|\s*}}.*/g;



  function checkAttributes(doc, fatherContext) {
    var state = {
      hasRepeat: false,
      context: fatherContext
    };
    var newContext = {
      scope: {},
      node: doc,
      eom: {},
      reg: reg
    };

    if (doc.attributes && doc.attributes.length) {
      tool.loop(doc.attributes, function(attr) {
        var key = attr.nodeName;
        var value = attr.nodeValue.replace(reg, '');
        var grammer = loadGrammer(key);

        if ('repeat' === key) {
          state.hasRepeat = true;
        }
        if ('scope' === key) {
          //here we cover the current context by newContext;
          state.context = newContext;
          grammer.call(state.context, value);
          if (fatherContext) {
            //the inherit object should be the same reference,nor a new one.And no need to inherit eom.
            tool.inherit(state.context.scope, fatherContext.scope);

          }
        } else {
          if (tool.isFunction(grammer)) {
            if (state.context) {
              state.context.node = doc;
              grammer.call(state.context, value);
              checkText(attr, state.context);
            } else {
              state.context = newContext;
              loadGrammer('scope').call(state.context, value);
              grammer.call(state.context, value);
            }
          }
        }
      });
    }
    return state;
  }

  function checkText(doc, context) {
    if (reg.test(doc.nodeValue)) {
      var key = doc.nodeValue.replace(reg, '');
      if (!context.eom[key]) {
        context.eom[key] = [];
      }
      context.eom[key].push({
        element: doc,
        expression: doc.nodeValue
      });
      doc.nodeValue = doc.nodeValue.replace(/{{.*}}/, context.scope[key]);
    }
  }

  function checkChildren(doc, context) {
    if (doc.childNodes && doc.childNodes.length) {
      tool.loop(doc.childNodes, function(child) {
        scan(child, context);
      });
    }
  }



  function scan(doc, context) {
    var state = checkAttributes(doc, context);
    if (state.context) {
      checkText(doc, state.context);
    }
    if ('CODE' !== doc.nodeName && 'PRE' !== doc.nodeName && !state.hasRepeat) {
      if (state.context) {
        checkChildren(doc, state.context);
      } else {
        checkChildren(doc);
      }
    }
  }

  return {
    scan:scan
  };

});

main(function(){
  var me = this;
  document.addEventListener('DOMContentLoaded', function() {
    var scan = me.need('river.engine').scan;
    scan(document);
  });
});
define('river.scenario',function(){

  var tools = this.need('river.core.tools');

  /**
   * this function is for trigger browser default behavior,
   * and it will be usefule , when you do the unite test , or e2e test
   * in the future
   */
  function _trigger (type,element){

    //to-do , cross IE < 9
    var event = document.createEvent('MouseEvents');
    event.initEvent(type,true,true);
    element.dispatchEvent(event);
  }

  return {
    trigger:_trigger
  };
});
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
define('river.core.model', function() {

  var tools = this.need('river.core.tools');

  var _eoms = {}, lasts = {};

  var isArray = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each = tools.each;
  var loop = tools.loop;

  function update(value, key, eom) {
    if (isString(value) || isNumber(value)) {
      loop(eom[key], function(ele, i) {
        ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
        //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
      });
    } else if (isArray(value)) {
      loop(value, function(item, index) {
        update(item, index, eom[key][index]);
      });
    } else if (isObject(value)) {
      each(value, function(item, index) {
        update(item, index, eom);
      });
    }
  }

  function Model(ns, eom, ref) {
    _eoms[ns] = eom;
    lasts[ns] = {};
    this.$$ns = ns;
    for (var x in ref) {
      this[x] = ref[x];
      last[x] = ref[x];
    }
  }

  Model.prototype.apply = function() {
    var _eom = _eoms[this.$$ns],
      last = lasts[this.$$ns];
    each(this, function(val, index) {
      if (_eom[index] && last[index] !== val) {
        update(val, index, _eom);
        last[index] = val;
      }
    });
  };

  Model.prototype.watch = function(eom, repeat) {};

  Model.prototype.inject = function(source) {
    var me = this;
    each(source, function(item, index) {
      me[index] = source[index];
    });
  };

  return Model;
});
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
      var f = new F();
      for(var z in f){
        target[z] = f[z];
      }
      return target;
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
define('river.grammer.jbind',function(){

  function jbind (str){
    var scope = this.scope;
    var oldValue = this.node.value = scope[str];

    var interval;

    this.node.onfocus = function(){
      var ele = this;
      interval = setInterval(function(){
        watch(ele.value);
      },30);
    };

    this.node.onblur = function(){
      clearInterval(interval);
    };

    function watch(newValue){
      if(newValue !== oldValue){
        scope[str] = newValue;
        oldValue = newValue;
        scope.apply();
      }
    }
  }

  return jbind;

});
define('river.grammer.jChange', function() {
  function change (str) {
    var fn = this.scope[str];
    var scope = this.scope;

    this.node.onchange = function(){
      fn.call({},this.value);
      scope.apply();
    };
  }
  return change;
});
define('river.grammer.jclick', function() {
  function click (str) {
    var key = str.replace(/\(.*\)/,'');
    var fn = this.scope[key];
    var scope = this.scope;

    var param = /\((.*)\)/;
    var target = str.match(param);
    var args = [];

    if(target && target.length){
      args = target[1].split(',');
    }

    this.node.onclick = function(){
      fn.apply({},args);
      scope.apply();
    };
  }
  return click;
});
define('river.grammer.jcompile',function(){
  return function(){
  };
});
define("river.grammer.repeat", function() {
  var $tool = this.need('river.core.tools');

  /**
   * all the grammer 'this' object contains,this the base api
   * {
   *  node:,
   *  reg:,
   *  scope,
   *  eom
   *  }
   **/


  function repeat(str) {
    //to-do
    var afterIn = /.*in\s/;
    var beforeIn = /\sin.*/;
    var ns = /.*\./;
    var pro = str.replace(afterIn, '').replace(ns, '');
    var data = this.scope[pro];
    var key = str.replace(beforeIn, '');
    var parentNode = this.node.parentNode;
    var node = parentNode.removeChild(this.node);
    var frg = document.createDocumentFragment();
    var _r = this.reg;
    var eom = this.eom[pro] = [];


    node.removeAttribute('repeat');

    if (data && data.length) {
      data.forEach(function(d) {
        var _n = node.cloneNode(true);
        var m = {};
        trans(_r, _n, d, key, m);
        eom.push(m);
        frg.appendChild(_n);
      });
      parentNode.appendChild(frg);
    }
  }

  var context = {};


  function trans(reg, doc, scope, key, eom) {
    var hasRepeat = false;
    if (doc.attributes && doc.attributes.length) {
      Array.prototype.forEach.call(doc.attributes, function(attr) {

        if (reg.test(attr.nodeValue)) {
          var k = attr.nodeValue.replace(reg, '').replace(key + '.', '');
          if (!eom[k]) {
            eom[k] = [];
          }
          eom[k].push({
            element: attr,
            expression: attr.nodeValue
          });
          attr.nodeValue = attr.nodeValue.replace(/{{.*}}/, scope[k]);
        }

        if ('repeat' === attr.nodeName) {
          hasRepeat = true;
          context.node = doc;
          context.scope = scope;
          context.reg = reg;
          context.eom = eom;
          repeat.call(context, attr.nodeValue.replace(reg, ''));
        }
      });
    }
    if (reg.test(doc.nodeValue)) {
      var k = doc.nodeValue.replace(reg, '').replace(key + '.', '');
      if (!eom[k]) {
        eom[k] = [];
      }
      eom[k].push({
        element: doc,
        expression: doc.nodeValue
      });
      //this change is for identify two case: 
      //  1. scope = {}
      //  2. scope = "string" or number
      var value  = $tool.isObject(scope) ? scope[k] : scope;
      doc.nodeValue = doc.nodeValue.replace(/{{.*}}/, value);
    }
    if (doc.childNodes && doc.childNodes.length && !hasRepeat) {
      Array.prototype.forEach.call(doc.childNodes, function(child) {
        trans(reg, child, scope, key, eom);
      });
    }
  }

  return repeat;
});
define('river.grammer.scope', function() {

  var me = this;
  var model = me.need('river.core.model');
  var tools = me.need('river.core.tools');

  function _scope(str) {
    //this.node.removeAttribute('scope');
    var source = me.need(str);
    if (tools.isObject(source)) {
      //source.watch(this.eom);
      this.scope = source;
    } else if (tools.isFunction(source)) {
      var m = new model(str, this.eom);
      this.scope = m;
      source.call(m);
    } else {
      var guid = tools.guid();
      this.scope = new model(guid, this.eom);
    }
  }

  return _scope;
});
