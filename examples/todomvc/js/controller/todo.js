/*
 * module dependence
 */

var model = require('model.todo') 
  , todos = exports.todos = model.get();

exports.newtodo = '';
exports.activenum = 0;
exports.completednum = 0;

exports.add = function (event) {
  if(event.keyCode == 13 && exports.newtodo){
    todos.unshift({
      desc:exports.newtodo,
      status:'active'
    });
    exports.newtodo = '';
    exports.activenum++;
  }
}

exports.remove = function (todo) {
  var index = todos.indexOf(todo);
  todos.splice(index,1);

  if(todo.status == 'active'){
    exports.activenum--;
  }else{
    exports.completednum--;
  }
}

exports.removeCompleted = function(){
  exports.completednum = 0;
  console.log(exports.todos);
  todos = exports.todos = todos.filter(function(d,i){
    if(d.status != 'completed'){
      return true;
    }
  });
  console.log(exports.todos);
}
