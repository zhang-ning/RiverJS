main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var $trigger = this.need('river.scenario').trigger;

  describe("test grammer scope feature.",function(){
    var dom,foo,scope,subscope;
    beforeEach(function(){
      foo = {
        changeName : function(){
          if(scope.name === "peter"){
            scope.name = "mariy";
          }else{
            scope.name = "peter";
          }
        },
        changeFavorit : function(){
          if(subscope.favorit ==="apple"){
            subscope.favorit = "banana";
          }else{
            subscope.favorit = "apple";
          }
        }
      };
      define("spec.scope",function(){
        return function(){
          scope = this;
          scope.name = "peter";
          scope.skill = "I can write programe.";
          scope.changeName = foo.changeName;
        };
      });

      define("spec.scope.sub",function(){
        return function(){
          subscope = this;
          this.name = "junior peter ";
          this.favorit = "apple";
          this.changeFavorit = foo.changeFavorit;
        };
      });

      dom = $compile('<div scope="spec.scope">' +
          '<p id="fa">{{ name }}</p>' +
          '<div scope="spec.scope.sub">' +
            '<p id="sa">{{ name    }}</p>' +
            '<p>{{ skill   }}</p>' +
            '<p>{{ favorit }}</p>' +
            '<span class="btn" jclick="changeFavorit">Change favorit</span>' +
          '</div>' +
          '<button jclick="changeName">Change Name</button>' +
        '</div>');

      spyOn(foo,'changeName').andCallThrough();
      $scan(dom);
    });

    it("nest scope shoud have inheritance ability",function(){
      expect(dom.textContent).not.toMatch(/undefined/);
    });

    it("trigger click n time,changeName will be called n time ",function(){
      for(var i=0;i<10;i++){
        $trigger('click',dom.querySelector('button'));
      }
      expect(foo.changeName.calls.length).toBe(10);
    });


    it("the name should be mariy",function(){
      $trigger('click',dom.querySelector('button'));
      var name = dom.querySelector('#fa').textContent;
      expect(name).toEqual("mariy");
    });

    it("the name should be peter",function(){
      $trigger('click',dom.querySelector('button'));
      $trigger('click',dom.querySelector('button'));
      var name = dom.querySelector('#fa').textContent;
      expect(name).toEqual("peter");
    });

    it("sub scope name should not be changed",function(){
      $trigger('click',dom.querySelector('button'));
      var son = dom.querySelector('#sa').textContent;
      expect(son).toEqual("peter son");
    });

    it("the favorit should be changed ",function(){
    });

  });
});
