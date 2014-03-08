define("app", function(exports, require, module) {
  (function(window) {
    "use strict";
  })(window);
});

define("controller.todo", function(exports, require, module) {
  var model = require("model.local"), todos = exports.todos = model.get();
  exports.newtodo = "";
  function calStatus() {
    exports.activenum = 0;
    exports.completednum = 0;
    for (var i = 0, len = todos.length; i < len; i++) {
      if (todos[i].status == "active") {
        exports.activenum++;
      } else {
        exports.completednum++;
      }
    }
  }
  function save() {
    calStatus();
    model.save(todos);
  }
  calStatus();
  exports.add = function(event) {
    if (event.keyCode == 13 && exports.newtodo) {
      todos.unshift({
        desc: exports.newtodo,
        status: "active"
      });
      exports.newtodo = "";
      save();
    }
  };
  exports.remove = function(todo) {
    var index = todos.indexOf(todo);
    todos.splice(index, 1);
    save();
  };
  exports.edit = function(event, todo) {
    todo.status = "editing";
  };
  exports.toggleall = function() {
    todos.forEach(function(d, i) {
      if (exports.completednum >= 0 && exports.completednum < todos.length) {
        d.status = "completed";
      } else {
        d.status = "active";
      }
    });
    save();
  };
  exports.removeCompleted = function() {
    exports.completednum = 0;
    todos = exports.todos = todos.filter(function(d, i) {
      if (d.status != "completed") {
        return true;
      }
    });
    save();
  };
});

define("model.local", function(exports, require, module) {
  var STORAGE_ID = "todos-riverjs";
  exports.get = function() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || "[]");
  };
  exports.save = function(todos) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
  };
});

define("river.grammer.route", function(exports, require, module) {
  exports = module.exports = function(str, scope, element) {};
});

define("river.grammer.status", function(exports, require, module) {
  exports = module.exports = function(str, scope, element) {
    var checkbox = element.querySelector("[type=checkbox]");
    var sta = {
      active: function() {
        element.className = "";
        checkbox.checked = false;
      },
      completed: function() {
        element.className = "completed";
        checkbox.checked = true;
      }
    };
    sta[scope.todo.status]();
    element.ondblclick = function(event) {
      var t = this.className;
      this.className = t + " editing";
      element.querySelector(".edit").focus();
    };
    var editinput = element.querySelector(".edit");
    editinput.addEventListener("blur", function() {
      var t = element.className;
      element.className = t.replace(/\sediting/, "");
    });
  };
});