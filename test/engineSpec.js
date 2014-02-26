describe('The template enginee render feature ',function(){

  var $compile,$scan;

  beforeEach(function(){
    main(function(){
      $compile = this.need('river.core.tools').compile;
      $scan = this.need('river.engine').scan;
    });
    define('testCtrl',function(){
      return { message : "hello scope" };
    });
  });

  it("test scope work",function(){
    var element = $compile("<div scope='testCtrl'>{{ message }}</div>");
    $scan(element);
    expect("hello scope").toBe(element.textContent);
  });

  it("the \\r out of expression and in tag",function(){
    var element = $compile("<div scope='testCtrl'>{{ message }}\r</div>");
    $scan(element);
    expect("hello scope").toBe(element.textContent);
  });

  it("the \\r in expression",function(){
    var element = $compile("<div scope='testCtrl'>{{ message \r}}</div>");
    $scan(element);
    expect("hello scope").toBe(element.textContent);
  });

  it("the \\n out of expression and in tag",function(){
    var element = $compile("<div scope='testCtrl'>{{ message }}\n</div>");
    $scan(element);
    expect("hello scope").toBe(element.textContent);
  });

  it("the \\n in expression",function(){
    var element = $compile("<div scope='testCtrl'>{{ message \n}}</div>");
    $scan(element);
    expect("hello scope").toBe(element.textContent);
  });

  it("the \\n in expression",function(){
    define('testCtrl',function(exports,require,module){
      exports.user = { name:'x' };
    });
    var element = $compile("<div scope='testCtrl'>{{ user.name }}</div>");
    $scan(element);
    expect("x").toBe(element.textContent);
  });
});
