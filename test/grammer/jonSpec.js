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
        ctrl : function(event,data){
          if(event.keyCode == 13){
            me.msg = 'hello world';
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

      var dom = $compile('<div scope="spec.jon">' +
          '<input type="text" jon="keydown | ctrl"/>' +
          '<p>{{ msg }}</p>' +
          '</div>');
      $scan(dom);
      var input = dom.querySelector("input");
      var msg = dom.querySelector("p");

      $key('keydown',14,'enter',input);
      foo.result2 = msg.textContent;

      $key('keydown',13,'enter',input);
      foo.result1 = msg.textContent;

    });

    it("clickCtrl should be called twice",function(){
      expect(foo.ctrl.calls.length).toEqual(2);
    });

    it("first result should be hello",function(){
      expect(foo.result2).toEqual('undefined');
    });

    it("first result should be hello",function(){
      expect(foo.result1).toEqual("hello world");
    });

  });
});
