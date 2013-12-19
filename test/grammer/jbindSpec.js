var dummy = { msg: "jbind works"};
define('testBind',function(){
  return function(){
    this.msg = dummy.msg;
  };
});

/**
 * here I want to add some commoments,
 * the color scheme is not work like expected.
 * */
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
          trigger('blur',input);
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

    it('should update multi expression when changing',function(){
      var element = $compile('<div scope="testBind">'+
                                '<input type="text" jbind="msg">'+
                                ' <p>1 {{ msg }}</p>' +
                                ' <p>2 {{ msg }}</p>' +
                                ' <p>3 {{ msg }}</p>' +
                             '</div>');
      dummy.msg = "t";
      $scan(element);
      expect(' 1 t 2 t 3 t').toBe(element.textContent);
      var input = element.querySelector('input');
      trigger('focus',input);
      input.value = "a";
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
        expect(' 1 a 2 a 3 a').toBe(element.textContent);
      });
    });
  });
});

