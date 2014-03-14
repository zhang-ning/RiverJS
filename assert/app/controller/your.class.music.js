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
