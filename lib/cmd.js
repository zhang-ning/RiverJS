/* 
 * all rights resorved by hunter.dding@gmail.com @猎人豆豆 @hunter.dding
 * please notice that the define,main are occupied as gloable variable
 * but most of time you only need to use define with CMD stand.
 * river.js by Jonathan version 13.11 
 */
var _$river = {
  // module define and run api
  sandbox: function() {
    var boxes = {};
    return {
      create: function(key, fn) {
        key = key.toLowerCase();
        boxes[key] = fn;
      },
      run: function(fn) {
        var context = {
          need: function(key) {
            key = key.toLowerCase();
            var api = boxes[key] && boxes[key].call(context,exports,require,module) || undefined;
            api = Object.keys(exports).length ? exports : api;
            return api;
          }
        };
        var module = context
          , exports = module.exports = {}
          , require = module.need;
        fn.call(context);
      }
    };
  }
};
_$river.module = _$river.sandbox();

/*jshint unused:false */


/**
 *@name define
 *@param {string} key - module name and NameSpace
 *@param {function} fn - the module implementation
 */
var define = _$river.module.create;
var main = _$river.module.run;

