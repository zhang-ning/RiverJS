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

    it('should work when put data or remove data', function() {
      var data = [];
      define('spec.repeat',function(){
        return function(){
          var scope = this;
          var users = this.users = [1,2,3];
          this.add = function (no) {
            scope.users.push(4);
          };
          this.remove = function(user){
            var i = users.indexOf(user);
            users.splice(i,1);
            data.push(user);
          };
        }
      });
      var dom = $compile(
        '<div scope="spec.repeat">' +
          '<span id="add" jclick="add"></span>' +
          '<ul class="users">' +
            '<li repeat="user in users">' +
               '<span jclick="remove(user)" class="su">{{ user}}</span>' +
            '</li>' +
          '</ul>' +
        '</div>'); 

      $scan(dom);
      var users = dom.querySelector('.users');
      var add = dom.querySelector('#add');

      $trigger('click',add);
      expect(dom.textContent).toEqual('1234');
      expect(users.childNodes.length).toBe(4);


      var remove = dom.querySelectorAll('.su');
      for(var i=0;i<remove.length;i++){
        $trigger('click',remove[i]);
      }
      expect(data).toEqual([1,2,3,4]);
      expect(users.childNodes.length).toBe(0);

      //not work to-do
      expect(dom.textContent).not.toMatch(/undefined/);
    });

    it("should work when there more then 3 layer nest structor.",function(){
      define('spec.repeat',function(){
        return function(){
          var m = {
            frameworks:[{ name : "jquery", 
              users : [{
                comp : "compA",
                emp : [{name : "a"},{name : "b"}] 
              }]
            },
            { name : "angularj", 
              users : [{
                comp : "compB",
                emp : [{name : "c"},{name : "d"}] 
              }]
            }
          ]}; 
        this.inject(m);
        };
      });

      var dom = $compile(
        '<div scope="spec.repeat">' +
          '<ul>' +
            '<li repeat="lib in m.frameworks">' +
              '<span>{{ lib.name }}</span>' +
              '<ul>' + 
                '<li repeat="user in fre.users">' + 
                  '<span>{{ user.comp }}</span>' +
                  '<ol><li repeat="ep in user.emp">{{ep.name}}</li></ol>' +
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
