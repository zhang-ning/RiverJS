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

define("river.grammer.checkstatus", function(exports, require, module) {
  exports = module.exports = function(str, scope, element, repeatscope) {
    var cbx = element.querySelector("[type=checkbox]");
    var logic = {
      all: all,
      active: active,
      completed: completed
    };
    function all(status) {
      if (status === "active") {
        element.className = "";
        cbx.checked = false;
      } else {
        element.className = "completed";
        cbx.checked = true;
      }
    }
    function active(status) {
      all(status);
      this.style.display = status == "active" ? "block" : "none";
    }
    function completed(status) {
      all(status);
      this.style.display = status == "completed" ? "block" : "none";
    }
    function route() {
      var menu = window.location.hash.replace(/\#\//, "") || "all";
      logic[menu].call(element, repeatscope.status);
    }
    cbx.onclick = function(event) {
      if (repeatscope.status == "active") {
        repeatscope.status = "completed";
        element.className = "completed";
        scope.activenum--;
        scope.completednum++;
      } else {
        repeatscope.status = "active";
        element.className = "active";
        scope.activenum++;
        scope.completednum--;
      }
      route();
      scope.apply();
    };
    route();
  };
});

define("river.grammer.filter", function(exports, require, module) {
  exports = module.exports = function(str, scope, element) {
    var eom = this.eom;
    window.onhashchange = function() {
      navigate();
    };
    function navigate() {
      var menu = window.location.hash.replace(/\#\//, "") || "all";
      var domlist = element.querySelectorAll("#filters a");
      clear(domlist);
      logic[menu].call(domlist, scope.todos, eom.todos);
    }
    function clear(domlist) {
      for (var i = 0, len = domlist.length; i < len; i++) {
        domlist[i].className = "";
      }
    }
    var logic = {};
    logic.all = function(todos, eom) {
      this[0].className = "selected";
      for (var i = 0, len = todos.length; i < len; i++) {
        eom[i].repeat.style.display = "block";
      }
    };
    logic.active = function(todos, eom) {
      this[1].className = "selected";
      for (var i = 0, len = todos.length; i < len; i++) {
        if (todos[i].status == "active") {
          eom[i].repeat.style.display = "block";
        } else {
          eom[i].repeat.style.display = "none";
        }
      }
    };
    logic.completed = function(todos, eom) {
      this[2].className = "selected";
      for (var i = 0, len = todos.length; i < len; i++) {
        if (todos[i].status == "completed") {
          eom[i].repeat.style.display = "block";
        } else {
          eom[i].repeat.style.display = "none";
        }
      }
    };
    navigate();
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