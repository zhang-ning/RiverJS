define('river.core.model', function() {

  var tools = this.need('river.core.tools');

  var _eoms = {}, lasts = {};

  var isArray  = tools.isArray;
  var isObject = tools.isObject;
  var isString = tools.isString;
  var isNumber = tools.isNumber;
  var each     = tools.each;
  var loop     = tools.loop;

  function update(value, eom, last) {
    if (isString(value) || isNumber(value)) {
      loop(eom, function(ele, i) {
        ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
        //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
      });
    } else if (isArray(value)) {
      loop(value, function(item, index) {
        if(value.length > last.length){
          eom[index].element.parentNode.appendChild(eom[index].element.cloneNode(true));
        }else if(value.length < last.length){
          eom[index].element.parentNode.removeChild(eom[index].element);
        }
        update(item, eom, last);
      });
    } else if (isObject(value)) {
      each(value, function(item, index) {
        update(item, eom, last);
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
        update(val, _eom[index],last[index]);
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
