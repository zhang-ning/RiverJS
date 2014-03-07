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

  var repeatNode,repeatContainer,rootScope;


  function repeat(str,scope,element) {
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
    var _scope = this.scope;

    rootScope = this.scope;

    node.removeAttribute('repeat');
    repeatNode = node;
    repeatContainer = parentNode;

    eom.repeatNode = node; 
    eom.repeatContainer = parentNode;
    eom.trans = trans;
    eom.key = key;
    eom.reg = _r;

    if (data && data.length) {
      data.forEach(function(d,i) {
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
        }
        F.prototype = _scope;

        var mod = new F(d);//new model(d);
        mod.__eom__ =  m;
        mod.__last__ = d;
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
          attr.nodeValue = attr.nodeValue.replace(/{{.*}}/, scope[k]);
        }

        context.node = doc;
        context.scope = scope;//scope; waiting for refactory
        context.reg = reg;
        context.eom = eom;
        if ('repeat' === attr.nodeName) {
          hasRepeat = true;
          repeat.call(context, attr.nodeValue.replace(reg, ''));
        }else{
          var grammer = loadGrammar(attr.nodeName);
          if($tool.isFunction(grammer)){
            //context.scope = rootScope;
            var str = attr.nodeValue.replace(reg, '');
            context.eom = {};
            //todo : scope should inherit from rootScope
            grammer.call(context,str,scope,context.node,scope);
          }
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
      var value  = typeof scope._$value == 'undefined' ? scope[k] : scope._$value;
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
