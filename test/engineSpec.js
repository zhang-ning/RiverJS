describe('The template enginee render feature ',function(){

  var $compile;

  main(function(){
    $compile = this.need('river.core.tools').compile;
  });

  it("test scope work",function(){
    define('testCtrl',function(){
      return { message : "hello scope" };
    });

    var element = $compile("<div scope='testCtrl'>{{ message }}</div>");

    main(function(){
      this.need('river.engine').scan(element);
      expect("hello scope").toBe(element.textContent);
    });
  });

});
