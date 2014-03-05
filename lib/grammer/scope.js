define('river.grammer.scope', function() {

  var me = this;
  var model = me.need('river.core.model');
  var tools = me.need('river.core.tools');

  function _scope(str) {
    this.node.removeAttribute('scope');
    var source = me.need(str);
    if (tools.isObject(source)) {
      var mod = new model(str, this.eom);
      //make source inherit from mod
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
      for(var x in mod){
         source[x] = mod[x]
      }
      source.__last__ = tools.clone(source);
      this.scope = source;
    } else if (tools.isFunction(source)) {
      var m = new model(str, this.eom);
      this.scope = m;
      source.call(m);
      m.__last__ = tools.clone(m);
    } else {
      var guid = tools.guid();
      var mo = new model(guid, this.eom);
      mo.__last__ = tools.clone(mo);
      this.scope  = mo;
    }
  }

  return _scope;
});
