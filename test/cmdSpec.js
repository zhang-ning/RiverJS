describe("The CMD module define feature", function() {

  define('test.A',function(){
    var name = "mk";
    return { 
      getName : function(){
        return name;
      }
    };
  });

  define('test.B',function(){
    var moduleA = this.need('test.A');
    return moduleA.getName();
  });

  define('test.C',function(){
    return this.need('test.B'); 
  });

  define('test.D',function(exports,require,module){
    var c = require('test.C');
    exports.name='jonathan';
    exports.getName = function(){
      return this.name;
    }
    exports.c = c;
  });

  define('test.E',function(exports,require,module){
    var D = require('test.D');
    exports = module.exports = {
      msg : D.name
    }
  });

  it("test.B can call test.A", function() {
    main(function(){
      expect('mk').toBe(this.need('test.B'));
    });
  });

  it("the nested dependence", function() {
    main(function(){
      expect('mk').toBe(this.need('test.C'));
    });
  });

  it("test.D : exports case", function() {
    main(function(exports,require,module){
      expect('jonathan').toBe(require('test.D').name);
    });
  });

  it("test.D: nest dependence", function() {
    main(function(exports,require,module){
      expect('mk').toBe(require('test.D').c);
    });
  });

  it("test.E : module.exports", function() {
    main(function(exports,require,module){
      expect('jonathan').toBe(require('test.E').msg);
    });
  });

});
