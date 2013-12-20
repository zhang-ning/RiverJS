main(function(){
  var $compile = this.need('river.core.tools').compile;
  var $scan = this.need('river.engine').scan;
  var $trigger = this.need('river.scenario').trigger;

  describe("test grammer repeat feature.",function(){
    
    it("should work when the iterate is a object type",function(){
      define('spec.repeat',function(){
        return {
          frameworks : [
            { name : "jquery", 
              users : [{name:"a"},{name:"b"}]
            },
            { name : "angularj", 
              users : [{name:"a"},{name:"b"}]
            },
            { name : "riverjs", 
              users : [{name:"a"},{name:"b"}]
            }
          ] 
        };
      });
      var dom = $compile(
        '<div scope="spec.repeat">' +
          '<ul>' +
            '<li repeat="lib in frameworks">' +
              '<span>{{ lib.name }}</span>' +
              '<ul>' + 
                '<li repeat="user in fre.users">' + 
                  '<span>{{ user.name }}</span>' +
                '</li>' +
              '</ul>' +
            '</li>' +
          '</ul>' +
        '</div>');

      $scan(dom);
      expect(dom.textContent).not.toMatch(/undefined/);
    });

    it("should work when the iterate is a common value.",function(){
      define('spec.repeat',function(){
        return {
          frameworks : [
            { name : "jquery", 
              users : ["a","b","c"]
            },
            { name : "angularj", 
              users : ["d","e","f"]
            },
            { name : "riverjs", 
              users : ["h","i","g"]
            }
          ] 
        };
      });

      var dom = $compile(
        '<div scope="spec.repeat">' +
          '<ul>' +
            '<li repeat="lib in frameworks">' +
              '<span>{{ lib.name }}</span>' +
              '<ul>' + 
                '<li repeat="user in fre.users">' + 
                  '<span>{{ user}}</span>' +
                '</li>' +
              '</ul>' +
            '</li>' +
          '</ul>' +
        '</div>');
      $scan(dom);
      expect(dom.textContent).not.toMatch(/undefined/);
    });

  });
});
