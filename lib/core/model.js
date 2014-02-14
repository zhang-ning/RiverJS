define('river.core.model', function() { //@sourceURL=../lib/core/model.js

  var tools = this.need('river.core.tools');

  var _eoms = {}, lasts = {};

  var isArray  = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each     = tools.each;
  var loop     = tools.loop;

  function update(value, key, eom ,oldvalue) {
    if (isString(value) || isNumber(value)) {
      if(eom && eom[key]){
        loop(eom[key], function(ele, i) {
          ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
          //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
        });
      }
    } else if (isArray(value)) {
      oldvalue = oldvalue ? oldvalue : [];
      if(oldvalue.length < value.length){
      }else if(oldvalue.length > value.length){
      }
      loop(value, function(item, index) {
        update(item, index, eom[key][index],oldvalue[index]);
      });
    } else if (isObject(value)) {
      oldvalue = oldvalue ? oldvalue : {};
      each(value, function(item, index) {
        update(item, index, eom , oldvalue[index]);
      });
    }
  }

  function Model(ns, eom, ref) {
    _eoms[ns] = eom;
    lasts[ns] = {};
    this.$$ns = ns;
    for (var x in ref) {
      this[x] = ref[x];
      lasts[ns] = tools.clone(ref);
    }
  }

  Model.prototype.apply = function() {
    var _eom = _eoms[this.$$ns]
      , last = lasts[this.$$ns];

    each(this, function(val, index) {
      if (_eom[index] && !tools.expect(last[index]).toEqual(val)) {
        update(val, index, _eom,last[index]);
        last[index] = tools.clone(val);
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
