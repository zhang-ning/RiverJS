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

define('spec.jclick',function(exports,require,module){
  var me = exports;
  exports.clickCtrl = function(){
    if(me.msg === 'hello'){
      me.msg = 'world';
    }else{
      me.msg = 'hello';
    }
  }
});

define('spec.jchange',function(exports,require,module){
  var me = exports;
  exports.changeCtrl = function(str){
    me.msg = str;
  }
});

define('testBind',function(exports,require,module){
  exports.msg = "jbind works";
});
