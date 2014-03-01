describe("test the basic crud functionality", function() {
  var foo = {};
  //controller
  define("todo.controller", function(exports,require,module) {
    exports.desc = 'hello';

    var todos = exports.todos = [];
    for (var i = 0, len = 5; i < len; i++) {
      todos.push({
        desc:'todo ' + i,
        createtime:new Date()
      });
    }

    exports.add = function(event,data){
      foo.data = data;
      if(event.keyCode == 13){
        todos.push({
          desc:data,
          createtime:new Date()
        })
      }
    }

    exports.remove = function(todo){
      var index = todos.indexOf(todo);
      todos.splice(index,1);
    }
  })

  main(function(exports,require,module){
    var $compile = require('river.core.tools').compile;
    var $scan = require('river.engine').scan;
    var scenario = require('river.scenario');
    var $trigger = scenario.trigger;
    var $key = scenario.key;


    var html =  ''
    + '<div scope="todo.controller">' 
    +   '<input id="new" type="textbox" jon="keydown:add(desc)" jbind="desc"/>'
    +   '<ul id="todos">'
    +     '<li repeat="todo in todos">'
    +       '<span jbind="todo.desc" class="desc">{{ todo.desc }}</span>'
    +       '<span class="remove" jclick="remove(todo)"></span>'
    +     '</li>'
    +   '</ul>'
    + '</div>';

    var dom=$compile(html);
    $scan(dom);
    it('add todo', function() {
      var input = dom.querySelector('#new');
      $trigger('focus',input);
      $key('keydown',13,'enter',input);
      expect(foo.data).toBe('hello');
    });

    it('repeat', function() {
      var ul = dom.querySelector('#todos');
      expect(ul.children.length).toBe(6);
    });

    it('remove todo', function() {
      var input = dom.querySelector('#new');
      var span = dom.querySelectorAll('#todos .remove')[0];
      $trigger('click',span);
      expect(dom.querySelectorAll('#todos .desc')[2].textContent).toBe('todo 3');
    });

    it('repeat', function() {
      var ul = dom.querySelector('#todos');
      expect(ul.children.length).toBe(5);
    });
  })
});
