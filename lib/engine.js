define('river.engine',function() {

  var me = this,
    tool = me.need('river.core.tools');
  function loadGrammer(key) {
    return me.need('river.grammer.' + key);
  }

  // this reg is for math {{ **.** }} type expression
  var reg = /.*{{\s*|\s*}}.*/g;



  function checkAttributes(doc, fatherContext) {
    var state = {
      hasRepeat: false,
      context: fatherContext
    };
    var newContext = {
      scope: {},
      node: doc,
      eom: {},
      reg: reg
    };

    if (doc.attributes && doc.attributes.length) {
      tool.loop(doc.attributes, function(attr) {
        var key = attr.nodeName;
        var value = attr.nodeValue.replace(reg, '');
        var grammer = loadGrammer(key);

        if ('repeat' === key) {
          state.hasRepeat = true;
        }
        if ('scope' === key) {
          //here we cover the current context by newContext;
          state.context = newContext;
          grammer.call(state.context, value);
          if (fatherContext) {
            //the inherit object should be the same reference,nor a new one.And no need to inherit eom.
            tool.inherit(state.context.scope, fatherContext.scope);

          }
        } else {
          if (tool.isFunction(grammer)) {
            if (state.context) {
              state.context.node = doc;
              grammer.call(state.context, value);
              checkText(attr, state.context);
            } else {
              state.context = newContext;
              loadGrammer('scope').call(state.context, value);
              grammer.call(state.context, value);
            }
          }
        }
      });
    }
    return state;
  }

  function checkText(doc, context) {
    if (reg.test(doc.nodeValue)) {
      var key = doc.nodeValue.replace(reg, '');
      if (!context.eom[key]) {
        context.eom[key] = [];
      }
      context.eom[key].push({
        element: doc,
        expression: doc.nodeValue
      });
      doc.nodeValue = doc.nodeValue.replace(/{{.*}}/, context.scope[key]);
    }
  }

  function checkChildren(doc, context) {
    if (doc.childNodes && doc.childNodes.length) {
      tool.loop(doc.childNodes, function(child) {
        scan(child, context);
      });
    }
  }



  function scan(doc, context) {
    var state = checkAttributes(doc, context);
    if (state.context) {
      checkText(doc, state.context);
    }
    if ('CODE' !== doc.nodeName && 'PRE' !== doc.nodeName && !state.hasRepeat) {
      if (state.context) {
        checkChildren(doc, state.context);
      } else {
        checkChildren(doc);
      }
    }
  }

  return {
    scan:scan
  };

});

main(function(){
  var me = this;
  document.addEventListener('DOMContentLoaded', function() {
    var scan = me.need('river.engine').scan;
    scan(document);
  });
});
