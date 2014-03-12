define("river.grammer.repeat", function(exports,require,module) {
  var $tool = require('river.core.tools')
    , $scan = require('river.engine').scan
    , model = require('river.core.model')
    , me    = this;

    function loadGrammar(key) {
      return me.need('river.grammer.' + key);
    }

  /**
   * all the grammer 'this' object contains,this the base api
   * {
   *  node:,
   *  reg:,
   *  scope,
   *  eom
   *  }
   **/

  var repeatNode,repeatContainer;
  var afterIn = /.*in\s/;
  var beforeIn = /\sin.*/;

  function repeat(str,scope,element) {
    //to-do
    var ns = /.*\./;
    var pro = str.replace(afterIn, '').replace(ns, '');
    var data = scope[pro];
    var key = str.replace(beforeIn, '');
    var parentNode = element.parentNode;
    var node = parentNode.removeChild(element);
    var frg = document.createDocumentFragment();
    var _r = this.reg;
    var eom = this.eom[pro] = [];

    node.removeAttribute('repeat');
    repeatNode = node;
    repeatContainer = parentNode;

    eom.repeatNode = node; 
    eom.repeatContainer = parentNode;
    eom.trans = trans;
    eom.key = key;
    eom.reg = _r;
    scope.__children__ = scope.__children__ || [];

    if (data && data.length) {
      data.forEach(function(d,i) {
        var _n = node.cloneNode(true);
        var m = {};
        var F = function(f){
          //this._$value = f;
          this[key] = f;
        }
        F.prototype = scope;

        var mod = new F(d);//new model(d);
        mod.__eom__ = {};
        mod.__eom__[key] =  m;
        mod.__last__ = {};
        mod.__last__[key] = scope.__last__ && scope.__last__[pro][i] || $tool.clone(d);
        mod.__listeners__ = {};
        scope.__children__.push(mod);
        trans(_r, _n, mod, key, m);
        m.repeat = _n;
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
          var value  = typeof scope[key] == 'object' ? scope[key][k] : scope[key];
          attr.nodeValue = attr.nodeValue.replace(/{{.*}}/, value);
        }

        context.node = doc;
        context.scope = scope;//scope; waiting for refactory
        context.reg = reg;
        context.eom = eom;
        if ('repeat' === attr.nodeName) {
          hasRepeat = true;
          var ch = attr.nodeValue.replace(afterIn,'').replace(/\..*/,'');
          context.scope = scope[ch]; 
          repeat.call(context, attr.nodeValue.replace(reg, ''),scope[ch],doc);
        }else{
          var grammer = loadGrammar(attr.nodeName);
          if($tool.isFunction(grammer)){
            var str = attr.nodeValue.replace(reg, '');
            context.eom = {};
            grammer.call(context,str,scope,context.node);
          }
        }
      });
    }
    if (reg.test(doc.nodeValue)) {
      var k = doc.nodeValue.replace(reg, '').replace(key + '.', '');
      $tool.buildobj(k,'.',eom,function(obj,key){
        obj[key] = obj[key] || [];
        obj[key].push({
          element: doc,
          expression: doc.nodeValue
        });
      });
      /*
      if (!eom[k]) {
        eom[k] = [];
      }
      eom[k].push({
        element: doc,
        expression: doc.nodeValue
      });
      */
      //this change is for identify two case: 
      //  1. scope = {}
      //  2. scope = "string" or number
      var value  = typeof scope[key] == 'object' ? scope[key][k] : scope[key];
      if(typeof scope[key] === 'object'){
        $tool.buildobj(k,'.',scope[key],function(obj,key){
          value = obj[key];
        });
      }
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
