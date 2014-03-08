/*
 * module dependence
 */

var model = require('model.local') 
  , todos = exports.todos = model.get();

exports.newtodo = '';

function calStatus(){
  exports.activenum = 0;
  exports.completednum = 0;
  for (var i = 0, len = todos.length; i < len; i++) {
    if(todos[i].status == 'active'){
      exports.activenum++;
    }else{
      exports.completednum++;
    }
  }
}

function save(){
  calStatus();
  model.save(todos);
}

calStatus();

exports.add = function (event) {
  if(event.keyCode == 13 && exports.newtodo){
    todos.unshift({
      desc:exports.newtodo,
      status:'active'
    });
    exports.newtodo = '';
    save();
  }
}

exports.remove = function (todo) {
  var index = todos.indexOf(todo);
  todos.splice(index,1);
  save();
}

exports.edit = function(event,todo){
  todo.status = 'editing';
}


exports.toggleall = function(){
  todos.forEach(function(d,i){
    if(exports.completednum >= 0 && exports.completednum < todos.length){
      d.status = 'completed';
    }else{
      d.status = 'active';
    }
  });
  save();
}

exports.removeCompleted = function(){
  exports.completednum = 0;
  todos = exports.todos = todos.filter(function(d,i){
    if(d.status != 'completed'){
      return true;
    }
  });
  save();
}
