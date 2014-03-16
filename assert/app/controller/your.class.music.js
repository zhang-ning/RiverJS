define('your.class.music', function() {
  var myMusicfromDB = {
    title: 'Welcome to my Music zone',
    singers: [{
        name: 'Michael Jackson',
        songs:[{
          url:'http://some.mp3',
          name:'heal the world'
        },{
          url:'http://beatit.mp3',
          name:'black and white'
        }]
      }, {
        name: 'Avril Lavigne',
        songs:[{
          url:'http://some.mp3',
          name:'Smile'
        },{
          url:'http://some.mp3',
          name:'Girl friend'
        }]
      },{
        name: 'Lady Gaga',
        songs:[{
          url:'http://some.mp3',
          name:'Pock face'
        },{
          url:'http://some.mp3',
          name:'Bad romance'
        }]
      },{
        name: 'Rihanna',
        songs:[{
          url:'http://some.mp3',
          name:'umbrella'
        }]
      } 
    ]
  };
  return myMusicfromDB;
});


/*
 * quick example
 */
define('a', function (exports, require, module) {
  exports.name = 'a';
  exports.pv = 0;
  exports.add = function () {
    exports.pv++;
  }
  exports.reset = function () {
    exports.pv=0;
  }
});

define('river.grammer.myview', function (exports, require, module) {
  exports = module.exports = myview;

  function myview(max, scope, element) {
    scope.onchange('pv', function (newvalue) {
      var warning = Number(newvalue) >= Number(max);
      render(element,warning)
    })
  }

  function render(element,warning) {
    var p = element.querySelector('strong')
    p.className = warning ? 'warning' : '';
  }
})
