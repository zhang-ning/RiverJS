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

});
