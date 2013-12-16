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
    });
  });
});

