main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var $trigger = this.need('river.scenario').trigger;

  describe("test jCompile grammer feature.",function(){
    var execute,msgdom,btn;
    beforeEach(function(){
      var message,lang;
      define('spec.jcompile',function(){
        return function(){
          var scope = this;

          scope.msg = message;

          this.changeMsg = function(){
            scope.msg = lang; 
          };
        };
      });
      var dom = $compile('<div scope="spec.jcompile">' +
        '<p jcompile>{{ msg }}</p>' +
          '<span class="btn" jclick="changeMsg"></span>' +
        '</div>');

      msgdom = dom.querySelector('p');
      btn = dom.querySelector('.btn');

      execute = function(msg,lan){
        message=msg;
        lang = lan;
        $scan(dom);
      };

    });

    it("should be pure text",function(){
      execute('abc');
      expect('abc').toEqual(msgdom.textContent);
    });

    it("should be able to compile tag",function(){
      execute('<h1>abc</h1>');
      expect('abc').toEqual(msgdom.textContent);
    });

    it("should be changlable.",function(){
      execute('<h1>abc</h1>','mmmm');
      $trigger('click',btn);
      expect('mmmm').toEqual(msgdom.textContent);
    });
  });
});












