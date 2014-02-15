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
      }else if(eom && !eom[key]){
        each(eom,function(d,i){
          loop(d, function(ele, i) {
            ele.element.nodeValue = ele.expression.replace(/{{.*}}/, value);
            //ele.element.parent.innerHTML = ele.expression.replace(/{{.*}}/, value);
          });
        })
      }
    } else if (isArray(value)) {
      oldvalue = oldvalue ? oldvalue : [];
      var info = getRepeatTemp(eom[key]);
      var children = info.ele.parent.children;
      var length = value.length - children.length
        , len = Math.abs(length)
        , addItems = length > 0
        , removeItems = length < 0;
      if(addItems){
        for(var i = 0;i<len;i++){
          addEom(eom[key],info.eom,info.ele);
        }
      }else if(removeItems){
        Array.prototype.splice.call(eom[key],eom[key].length-len,len);
        for(var k= 0;k<len;k++){
          children[k].parentNode.removeChild(children[k]);
        }
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


  function getRepeatTemp(eom) {
    var neweom = tools.clone(eom[0]);
    var newele;
    each(neweom,function(d,i){
      if(!newele){
        loop(d,function(data,index){
          if(!newele){
            newele = data;
          }
        });
      }
    })
    return {
      eom : neweom,
      ele : newele
    }
  }

  function addEom(eom,neweom,newele) {
    eom.push(neweom);
    var newnode = newele.repeat.cloneNode(true);
    newele.parent.appendChild(newnode);
    newele.element = getTextNode(newnode)[0];
  }

  function getTextNode(node,texts){
    texts = texts || [];
    if(node.childNodes && node.childNodes.length){
      loop(node.childNodes,function(d,i){
        getTextNode(d,texts);
      });
    }else{
      texts.push(node);
    }
    return texts;
  }

  function Model(ns, eom) {
    _eoms[ns] = eom;
    lasts[ns] = {};
    this.$$ns = ns;
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
