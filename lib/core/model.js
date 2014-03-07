define('river.core.model', function(exports,require,module) { //@sourceURL=../lib/core/model.js

  var tools = this.need('river.core.tools');

  var me = this;

  var isArray  = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each     = tools.each;
  var loop     = tools.loop;

  function update(value, key, eom ,oldvalue) {
    var scope = this;
    if (isString(value) || isNumber(value)) {
      if(eom && eom[key]){
        loop(eom[key], function(ele, i) {
          ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
          if(ele.element.nodeName == 'INPUT'){
            ele.element.value = ele.expression.replace(/{{.*}}/, value);
          }
          //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
        });
      }
    } else if (isArray(value)) {
      oldvalue = oldvalue ? oldvalue : [];
      diff(value,oldvalue,eom[key],scope);
    } else if (isObject(value)) {
      oldvalue = oldvalue ? oldvalue : {};
      each(value, function(item, index) {
        update.call(scope,item, index, eom , oldvalue[index]);
      });
    }
  }

  function diff(value,oldvalue,eom,scope){
    var len = value.length >= oldvalue.length ? value.length : oldvalue.length;
    var expect = tools.expect;
    var container = eom.repeatContainer;
    var cnt = 0;
    for (var i = 0 ; i < len; i++) {
      var newvalue = value[i];
      var exists = typeof newvalue !== 'undefined';
      if(exists && !expect(newvalue).toEqual(oldvalue[i])){
        var neweom = getNewEom(eom,newvalue,scope);
        var refnode = container.children[i];
        oldvalue.splice(i,1,newvalue); // sync oldvalue
        eom.splice(i,1,neweom); //sync eom
        container.insertBefore(neweom.repeat,refnode); //sync dom
        if(refnode)container.removeChild(refnode);
      }else if(!exists){
        oldvalue.splice(i-cnt,1);
        eom.splice(i-cnt,1);
        container.removeChild(container.children[i-cnt]);
        cnt++;
      }
    }
  }

  function getIndex(v,srcarray){
    var result = -1;
    for (var i = 0, len = srcarray.length; i < len; i++) {
      if(tools.expect(v).toEqual(srcarray[i])){
        result = i;
        break;
      }
    }
    return result;
  }

  function getNewEom(eom,d,parentscope){
    var trans = eom.trans;
    var node = eom.repeatNode;
    var _r = eom.reg;
    var key = eom.key;
  //  var parentNode = eom.repeatContainer;
    var _n = node.cloneNode(true);
    var m = {};
    var F = function(f){
      if(typeof f == 'object'){
        for(var x in f){
          this[x] = f[x];
        }
      }else{
        this._$value = f;
      }
    };
    F.prototype = parentscope;
    var mod = new F(d);
    mod.__eom__ =  m;
    mod.__last__ = d;
    trans(_r, _n, mod, key, m);
    m.repeat = _n;
    return m;
  }


  function Model(ref) {
    if(typeof ref === 'object'){
     for(var x in ref){
       this[x] = ref[x];
     } 
    }else{
      this._$value = ref;
    }
  }

  Model.prototype.apply = function() {
    apply.call(this);
    apply.call(Object.getPrototypeOf(this));
  };

  function apply (){
    var _eom = this.__eom__
      , last = this.__last__
      , scope = this;
    if(!_eom) return;
    each(this, function(val, index) {
      if (_eom[index] && !tools.expect(last[index]).toEqual(val)) {
        update.call(scope,val, index, _eom,last[index]);
        last[index] = tools.clone(val);
      }
    });
  }

  Model.prototype.watch = function(eom, repeat) {};

  Model.prototype.inject = function(source) {
    var me = this;
    each(source, function(item, index) {
      me[index] = source[index];
    });
  };

  return Model;
});
