main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var trigger = this.need('river.scenario').trigger;

  describe("The jChange grammer feature.",function(){
    var foo;
    beforeEach(function(){
      foo = {
        changeCtrl : function(){
        }
      };
      spyOn(foo,'changeCtrl');

      /**
       * the spec module is for testing.
       **/
      define('spec.jchange',function(){
        return function(){
          this.changeCtrl = foo.changeCtrl;
        };
      });
      var element = $compile('<select scope="spec.jchange" jchange="changeCtrl"><option value="f">first</option><option value="s">second</option></select>');

      $scan(element);
      element.value = "f";
      trigger('change',element);
      element.value = "s";
      trigger('change',element);
    });

    it("when the select input element options changed,the fn should be called.",function(){
      expect(foo.changeCtrl).toHaveBeenCalled();
    });

    it("have been called twice",function(){
      expect(foo.changeCtrl.calls.length).toEqual(2);
    });

    it("first call parameters should be f",function(){
      expect(foo.changeCtrl.calls[0].args[0]).toEqual("f");
    });
    
    it("second call parameters should be s",function(){
      expect(foo.changeCtrl.calls[1].args[0]).toEqual("s");
    });
  }); 
});
