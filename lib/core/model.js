define('river.core.model', function() {

  var tools = this.need('river.core.tools');

  var _eoms = {}, lasts = {};

  var isArray  = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each     = tools.each;
  var loop     = tools.loop;

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
      lasts[ns] = tools.clone(ref);
    }
  }

  Model.prototype.apply = function() {
    var _eom = _eoms[this.$$ns]
      , last = lasts[this.$$ns];

    each(this, function(val, index) {
      if (_eom[index] && !tools.diff(last[index],val)) {
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
