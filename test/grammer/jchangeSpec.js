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
    });

    it("when the select input element options changed,the fn should be called.",function(){
      /**
       * the spec module is for testing.
       **/
      define('spec.jchange',function(){
        return function(){
          this.ChangeCtrl = function(val){
          };
        };
      });
      var element = $compile('<select scope="spec.jchange" jchange="changeCtrl"><option value="f">f</option><option value="s">s</option></select>');
      //$scan(element);
      //expect('jbind works').toBe(element.textContent);
    });
  }); 
});
