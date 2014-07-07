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
      for(var i = 0;i<doc.attributes.length;i++){
        var attr= doc.attributes[i];
        var key = attr.nodeName;
        var value = attr.nodeValue.replace(reg, '');
        var grammer = loadGrammer(key);

        if ('scope' === key) {
          //here we cover the current context by newContext;
          state.context = newContext;
          grammer.call(state.context, value,state.context.scope,state.context.node);
          if (fatherContext) {
            //the inherit object should be the same reference,nor a new one.And no need to inherit eom.
            tool.inherit(state.context.scope, fatherContext.scope);
          }
        } else {
          if (tool.isFunction(grammer)) {
            if (state.context) {
              state.context.node = doc;
              grammer.call(state.context, value,state.context.scope,state.context.node);
              checkText(attr, state.context);
            } else {
              state.context = newContext;
              loadGrammer('scope').call(state.context, value);
              grammer.call(state.context, value,state.context.scope,state.context.node);
            }
          }
        }
        if ('repeat' === key) {
          state.hasRepeat = true;
          break;
        }
      }
    }
    return state;
  }

  function checkText(doc, context) {
    if (reg.test(doc.nodeValue)) {
      var key = doc.nodeValue.replace(/\r|\n/g,'').replace(reg, '');
      //'a.b.c.d'
      var ns = key.split('.');
      var value = {};
      var eom = {};
      for(var i=0;i<ns.length;i++){
        if(typeof value === 'object'){
          value = value[ns[i]] || context.scope[ns[i]] 
        }
      }
      value = typeof value == 'object' ? JSON.stringify(value) : value;
      if(typeof value == 'undefined') value = '';
      tool.buildobj(key,'.',context.eom,function(obj,key){
        obj[key] = obj[key] || [];
        obj[key].push({
          element: doc,
          expression: doc.nodeValue
        });
      });
      doc.nodeValue = doc.nodeValue.replace(/\r|\n/g,'').replace(/{{.*}}/, value);
    }
  }

  function checkChildren(doc, state) {
    if (doc.childNodes && doc.childNodes.length) {
      for(var i=0;i<doc.childNodes.length;i++){
        var child = doc.childNodes[i];
        var context = state ? state.context : undefined;
        var s = scan(child, context);
        if(s.hasRepeat) break;
      }
    }
  }



  function scan(doc, context) {
    var state = checkAttributes(doc, context);
    if (state.context) {
      checkText(doc, state.context);
    }
    if ('CODE' !== doc.nodeName && 'PRE' !== doc.nodeName && !state.hasRepeat) {
      if (state.context) {
        checkChildren(doc, state);
      } else {
        checkChildren(doc);
      }
    }
    return state;
  }


  /*!
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   *
   */

  // @win window reference
  // @fn function reference
  function contentLoaded(win, fn) {

    var done = false, top = true,

    doc = win.document, root = doc.documentElement,

    add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
    rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
    pre = doc.addEventListener ? '' : 'on',

    init = function(e) {
      if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
      (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) fn.call(win, e.type || e);
    },

    poll = function() {
      try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
      init('poll');
    };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
      if (doc.createEventObject && root.doScroll) {
        try { top = !win.frameElement; } catch(e) { }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }

  return {
    scan:scan,
    compile:scan,
    ready:contentLoaded
  };

});
