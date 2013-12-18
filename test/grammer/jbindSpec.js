define('testBind',function(){
  return function(){
    this.msg = "jbind works";
  };
});

main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var trigger = this.need('river.scenario').trigger;

  describe('template enginee jbind grammer',function(){
    it('should update mode when view changed',function(){
      var element = $compile('<div scope="testBind"><input jbind="msg"/>{{msg}}</div>');
      $scan(element);
      expect('jbind works').toBe(element.textContent);
      var input = element.querySelector('input');

      //input.focus();
      trigger('focus',input);
      input.value = "change it";
      var flag = false;
      runs(function(){
        setTimeout(function(){
            flag = true;
        },100);
      });
      waitsFor(function(){ 
        return flag;
      },'somethings',100);
      runs(function(){
        expect('change it').toBe(element.textContent);
      });

    });
  });
});

