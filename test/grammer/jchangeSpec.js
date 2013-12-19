main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var trigger = this.need('river.scenario').trigger;

  describe("The jChange grammer feature.",function(){
    var foo,me;

    beforeEach(function(){
      foo = {
        changeCtrl : function(str){
          me.msg = str;
        }
      };

      spyOn(foo,'changeCtrl').andCallThrough();
      /**
       * the spec module is for testing.
       **/
      define('spec.jchange',function(){
        return function(){
          me = this;
          this.changeCtrl = foo.changeCtrl;
        };
      });


      var dom = $compile('<div scope="spec.jchange"><select jchange="changeCtrl"><option value="f">first</option><option value="s">second</option></select><p>{{ msg }}</p></div>');

      var element = dom.querySelector("select");
      var msg = dom.querySelector("p");

      $scan(dom);

      element.value = "f";
      trigger('change',element);
      foo.textC1 = msg.textContent;
      element.value = "s";
      trigger('change',element);
      foo.textC2 = msg.textContent;
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

    it("textC1 should be first,textC2 should be second.",function(){
      expect(foo.textC1).toEqual("f");
      expect(foo.textC2).toEqual("s");
    });

  }); 
});
