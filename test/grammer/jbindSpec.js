define('testBind',function(){
  return function(){
    this.msg = "jbind works";
  };
});

main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;

  describe('template enginee jbind grammer',function(){
    it('should update mode when view changed',function(){
      var element = $compile('<div scope="testBind"><input jbind="msg"/>{{msg}}</div>');
      $scan(element);
      expect('jbind works').toBe(element.textContent);
      var input = element.querySelector('input');

      input.focus();
      input.value = "change it";
      var flag = false;

      runs(function(){
        setTimeout(function(){
          flag = true;
        },300);
      });

      waitsFor(function(){
        return flag;
      },'exception',500);

      runs(function(){
        expect(element.textContent).toBe('change it');
        input.blur();
      });
    });
  });
});

