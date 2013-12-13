define('river.grammer.scope', function() {

  var me = this;
  var model = me.need('river.core.model');
  var tools = me.need('river.core.tools');

  function _scope(str) {
    //this.node.removeAttribute('scope');
    var source = me.need(str);
    if (tools.isObject(source)) {
      //source.watch(this.eom);
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
