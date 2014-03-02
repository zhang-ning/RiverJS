define('river.grammer.scope', function() {

  var me = this;
  var model = me.need('river.core.model');
  var tools = me.need('river.core.tools');

  function _scope(str) {
    this.node.removeAttribute('scope');
    var source = me.need(str);
    if (tools.isObject(source)) {
      var mod = new model(str, this.eom);
      //source.watch(this.eom);
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
      //as the __proto__ is deprecated,I have to do this
      for(var x in mod){
         source[x] = mod[x]
      }
      this.scope = source;
    } else if (tools.isFunction(source)) {
      var m = new model(str, this.eom);
      this.scope = m;
      source.call(m);
    } else {
      var guid = tools.guid();
      this.scope = new model(guid, this.eom);
    }
  }

  return _scope;
});
