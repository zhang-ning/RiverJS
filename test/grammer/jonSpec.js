main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var scenario = this.need('river.scenario');
  var $trigger = scenario.trigger;
  var $key = scenario.key;

  describe("test jon grammer feature.",function(){
    var foo,me,input,msg;
    beforeEach(function(){
      foo = {
        ctrl : function(event,data){
          foo.data = data;
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
                         '<input type="text" jon="keydown | ctrl(msg)" jbind="msg"/>' +
                         '<p>{{ msg }}</p>' +
                         '</div>');
      $scan(dom);
      input = dom.querySelector("input");
      msg = dom.querySelector("p");
    });

    it("test jbind",function(){
      $trigger('focus',input);
      input.value = 'good night';
      var flag = false;
      runs(function(){
        setTimeout(function(){
          $trigger('blur',input);
          flag = true;
        },100);
      });
      waitsFor(function(){ 
        return flag;
      },'somethings',100);
      runs(function(){
        expect('good night').toBe(msg.textContent);
        $key('keydown',13,'enter',input);
      });
    });


    it("first result should be hello",function(){
      $key('keydown',14,'enter',input);
      foo.result2 = msg.textContent;
      expect(foo.result2).toEqual('');
      expect(foo.ctrl.calls.length).toEqual(1);
    });

    it("first result should be hello",function(){
      $key('keydown',13,'enter',input);
      foo.result1 = msg.textContent;
      expect(foo.result1).toEqual("hello world");
      expect(foo.ctrl.calls.length).toEqual(1);
    });

  });
});
