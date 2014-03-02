define('river.core.model', function() { //@sourceURL=../lib/core/model.js

  var tools = this.need('river.core.tools');

  var _eoms = {}, lasts = {} , me = this;

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
      var children = eom[key].repeatContainer.children;
      var length = value.length - children.length
        , len = Math.abs(length)
        , addItems = length > 0
        , removeItems = length < 0;
      if(addItems){
        var vv = value.slice(value.length-len,value.length);
        for(var i = 0;i<len;i++){
          generageEom(eom[key],vv);
        }
      }else if(removeItems){
        Array.prototype.splice.call(eom[key],0,len);
        for(var k= 0;k<len;k++){
          children[k].parentNode.removeChild(children[k]);
        }
      }
      loop(value, function(item, index) {
        update.call(scope,item, index, eom[key][index],oldvalue[index]);
      });
    } else if (isObject(value)) {
      oldvalue = oldvalue ? oldvalue : {};
      each(value, function(item, index) {
        update.call(scope,item, index, eom , oldvalue[index]);
      });
    }
  }


  function generageEom(eom,data) {
    var trans = eom.trans;
    var node = eom.repeatNode;
    var _r = eom.reg;
    var key = eom.key;
    var parentNode = eom.repeatContainer;
    var frg = document.createDocumentFragment();
    if (data && data.length) {
      data.forEach(function(d,i) {
        var _n = node.cloneNode(true);
        var m = {};
        trans(_r, _n, d, key, m,i);
        eom.push(m);
        frg.appendChild(_n);
      });
      parentNode.appendChild(frg);
    }
  }

  function getTextNode(node,value,texts){
    texts = texts || [];
    var scope = this;
    if(node.attributes){
      executeGrammer(node,scope,value);
    }
    if(node.childNodes && node.childNodes.length){
      loop(node.childNodes,function(d,i){
        getTextNode.call(scope,d,value,texts);
      });
    }else{
      texts.push(node);
    }
    return texts;
  }

  function executeGrammer(node,scope,data){
    var attrs = node.attributes;
    for(var i=0;i<attrs.length;i++){
      var attr = attrs[i];
      var grammer= me.need('river.grammer.' + attr.nodeName);
      if(grammer){
        grammer.call({scope:scope,node:node},attr.nodeValue,scope,node,data);
      }
    }
  }

  function Model(ns, eom) {
    _eoms[ns] = eom;
    lasts[ns] = {};
    this.$$ns = ns;
  }

  Model.prototype.apply = function() {
    var _eom = _eoms[this.$$ns]
      , last = lasts[this.$$ns]
      , scope = this;

    each(this, function(val, index) {
      if (_eom[index] && !tools.expect(last[index]).toEqual(val)) {
        update.call(scope,val, index, _eom,last[index]);
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
