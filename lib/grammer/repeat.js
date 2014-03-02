define("river.grammer.repeat", function() {
  var $tool = this.need('river.core.tools')
    , $scan = this.need('river.engine').scan
    , me    = this;

    function loadGrammer(key) {
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
        trans(_r, _n, d, key, m,i);
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
            expression: attr.nodeValue,
            repeat:repeatNode,
            parent:repeatContainer
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
          var grammer = loadGrammer(attr.nodeName);
          if($tool.isFunction(grammer)){
            //context.scope = rootScope;
            grammer.call(context, attr.nodeValue.replace(reg, ''),rootScope,context.node,scope);
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
        expression: doc.nodeValue,
        repeat:repeatNode,
        parent:repeatContainer
      });
      //this change is for identify two case: 
      //  1. scope = {}
      //  2. scope = "string" or number
      var value  = $tool.isObject(scope) ? scope[k] : scope;
      doc.nodeValue = doc.nodeValue.replace(/{{.*}}/, value);
    }
    if (doc.childNodes && doc.childNodes.length && !hasRepeat) {
      Array.prototype.forEach.call(doc.childNodes, function(child) {
        trans(reg, child, scope, key, eom,scope);
      });
    }
  }

  return repeat;
});
