define('river.core.model', function(exports,require,module) { //@sourceURL=../lib/core/model.js

  var tools = this.need('river.core.tools');

  var me = this;

  var isArray  = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each     = tools.each;
  var loop     = tools.loop;

  function update(value, key, eom ,last) {
    var scope = this;
    var oldvalue = last[key];
    var isEqual = value == oldvalue;
    if(isEqual) return;
    if (isString(value) || isNumber(value)) {
      if(eom && eom[key]){
        loop(eom[key], function(ele, i) {
          ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
          if(ele.element.nodeName == 'INPUT'){
            ele.element.value = ele.expression.replace(/{{.*}}/, value);
          }
          //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
        });
        var fns = scope.__listeners__ && scope.__listeners__[key] ;
        if(fns){
          for (var i = 0, len = fns.length; i < len; i++) {
            fns[i](value,last[key]);
          }
        }
      }
      last[key] = value;
    } else if (isArray(value)) {
      last[key] = oldvalue ? oldvalue : [];
      diff(value,last[key],eom[key],scope,key,last);
    } else if (isObject(value)) {
      oldvalue = oldvalue ? oldvalue : {};
      each(value, function(item, index) {
        update.call(scope,item, index, eom[key], oldvalue);
      });
    }
  }

  function diff(value,oldvalue,eom,scope,key,last){
    var len = value.length >= oldvalue.length ? value.length : oldvalue.length;
    var expect = tools.expect;
    var container = eom.repeatContainer;
    var cnt = 0;
    for (var i = 0 ; i < len; i++) {
      var newvalue = value[i];
      var exists = typeof newvalue !== 'undefined';
      if(exists && !expect(newvalue).toEqual(oldvalue[i])){
        var neweom = getNewEom(eom,newvalue,scope,key,i,last);
        var refnode = container.children[i];
        //oldvalue.splice(i,1,newvalue); // sync oldvalue
        if(typeof newvalue == 'object'){
          oldvalue[i] = oldvalue[i] || {};
          cover(oldvalue[i],newvalue);
        }else{
          oldvalue[i] = newvalue;
        }
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

  function cover(oldvalue,newvalue){
    for(var x in newvalue){
      if(typeof newvalue[x] == 'object'){
        oldvalue[x] = oldvalue[x] || {};
        cover(oldvalue[x],newvalue[x]);
      }
      oldvalue[x] = newvalue[x];
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

  function getNewEom(eom,d,parentscope,ns,index,last){
    var trans = eom.trans;
    var node = eom.repeatNode;
    var _r = eom.reg;
    var key = eom.key;
    var _n = node.cloneNode(true);
    var m = {};
    var F = function(f){
      this.__eom__ = {};
      this.__last__ = {};
      this.__listeners__ = {};
      this[key] = f;
      this.__eom__[key] = m;
      this.__last__[key] = last[ns] && last[ns][index] || tools.clone(d);
    };
    F.prototype = parentscope;
    var mod = new F(d);
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
    this.__listeners__ = {};
  }

  Model.prototype.apply = function() {
    var father = Object.getPrototypeOf(this);
    var me = this;
    apply.call(me);
    apply.call(father);
  };

  function apply (){
    var _eom = this.__eom__
      , last = this.__last__
      , scope = this;
    if(!_eom) return;

    each(this, function(val, index) {
      if(/__/.test(index)) return;
      if (_eom[index] && !tools.expect(last[index]).toEqual(val)) {
        update.call(scope,val, index, _eom,last);
        //last[index] = tools.clone(val);
      }
    });
  }

  Model.prototype.watch = function(eom, repeat) {};

  Model.prototype.onchange = function(id,fn) {
    var lis = this.__listeners__[id] = this.__listeners__[id] || [];
    lis.push(fn);
  };

  Model.prototype.inject = function(source) {
    var me = this;
    each(source, function(item, index) {
      me[index] = source[index];
    });
  };

  return Model;
});
