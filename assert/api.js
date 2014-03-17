define('spec.repeat', function (exports,require,module) {
  exports = module.exports = function () {
    var m = {
      frameworks: [{
        name: "jquery",
        users: [{
          comp: "compA",
          emp: [{
            name: "a"
          }, {
            name: "b"
          }]
        }]
      }, {
        name: "angularj",
        users: [{
          comp: "compB",
          emp:
            [{
            name:
              "c"
          },
          {
            name:
              "d"
          }]
        }]
      }]
    };
    this.inject(m);
  };
});

define('spec.jon', function (exports,require,module) {
  exports = module.exports = function () {
    me = this;
    this.ctrl = function (event, data) {
      if (event.keyCode == 13) {
        me.msg = 'hello world';
      }
    }
  };
});
