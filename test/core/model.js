describe("test river.core.model", function() {

  var $compile,$scan,html,foo,bar;

  beforeEach(function(){
    main(function(exports,require,module){
      $compile = require('river.core.tools').compile;
      $scan = require('river.engine').scan;
    });

    runs(function(){
      define('app',function(exports,require,module){
        bar = exports;
        setTimeout(function(){
          exports.user = { jonathan : { age:30} };
          exports.apply();
          foo = {
            exports : exports
          }
        },10);
      });
      html = $compile("<div scope='app'>{{ user.jonathan.age }}</div>");
      $scan(html);
      waits(10);
    });
  });

  describe("async apply", function() {
    it('should be 30', function() {
      expect(foo.exports.apply).not.toBe(undefined);
      expect(html.textContent).toBe('30');
    });
  });
});
