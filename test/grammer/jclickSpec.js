main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var $trigger = this.need('river.scenario').trigger;

  describe("test jClick grammer feature.",function(){
    var foo,me;
    beforeEach(function(){
      foo = {
        clickCtrl : function(){
          if(me.msg === 'hello'){
            me.msg = 'world';
          }else{
            me.msg = 'hello';
          }
        }
      };

      spyOn(foo,'clickCtrl').andCallThrough();

      define('spec.jclick',function(){
        return function(){
          me = this;
          this.clickCtrl = foo.clickCtrl;
        };
      });

      var dom = $compile('<div scope="spec.jclick">' +
                         '<button jclick="clickCtrl"></button>' +
                         '<p>{{ msg }}</p>' +
                         '</div>');

      $scan(dom);
      var button = dom.querySelector("button");
      var msg = dom.querySelector("p");

      $trigger('click',button);
      foo.result1 = msg.textContent;
      $trigger('click',button);
      foo.result2 = msg.textContent;
    });

    it("clickCtrl should be called twice",function(){
      expect(foo.clickCtrl.calls.length).toEqual(2);
    });

    it("first result should be hello",function(){
      expect(foo.result1).toEqual("hello");
    });

    it("second result should be world",function(){
      expect(foo.result2).toEqual("world");
    });
  });


  describe("test jClick grammer feature via new module.",function(){
    var foo,me;
    beforeEach(function(){
      foo = {
        clickCtrl : function(){
          if(me.msg === 'hello'){
            me.msg = 'world';
          }else{
            me.msg = 'hello';
          }
        }
      };

      spyOn(foo,'clickCtrl').andCallThrough();

      define('spec.jclick',function(exports,require,module){
        exports = module.exports = function(){
          me = this;
          this.clickCtrl = foo.clickCtrl;
        };
      });

      var dom = $compile('<div scope="spec.jclick">' +
                         '<button jclick="clickCtrl"></button>' +
                         '<p>{{ msg }}</p>' +
                         '</div>');

      $scan(dom);
      var button = dom.querySelector("button");
      var msg = dom.querySelector("p");

      $trigger('click',button);
      foo.result1 = msg.textContent;
      $trigger('click',button);
      foo.result2 = msg.textContent;
    });

    it("clickCtrl should be called twice",function(){
      expect(foo.clickCtrl.calls.length).toEqual(2);
    });

    it("first result should be hello",function(){
      expect(foo.result1).toEqual("hello");
    });

    it("second result should be world",function(){
      expect(foo.result2).toEqual("world");
    });
  });

});
