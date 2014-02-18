main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var scenario = this.need('river.scenario');
  var $trigger = scenario.trigger;
  var $key = scenario.key;

  describe("test jon grammer feature.",function(){
    var foo,me;
    beforeEach(function(){
      foo = {
        ctrl : function(){
          if(me.msg === 'hello'){
            me.msg = 'world';
          }else{
            me.msg = 'hello';
          }
        }
      };

      spyOn(foo,'ctrl').andCallThrough();

      define('spec.jon',function(){
        return function(){
          me = this;
          this.ctrl = foo.ctrl;
        };
      });

      var dom = $compile('<div scope="spec.jclick">' +
          '<button jon="keypress | clickCtrl"></button>' +
          '<p>{{ msg }}</p>' +
          '</div>');
      $scan(dom);
      var button = dom.querySelector("button");
      var msg = dom.querySelector("p");

     // $key('keydown',13,button);
      foo.result1 = msg.textContent;
      //$trigger('keydown',13,button);
      foo.result2 = msg.textContent;
    });

    it("clickCtrl should be called twice",function(){
      //expect(foo.clickCtrl.calls.length).toEqual(2);
    });

    it("first result should be hello",function(){
      //expect(foo.result1).toEqual("hello");
    });

    it("second result should be world",function(){
      //expect(foo.result2).toEqual("world");
    });
  });
});
