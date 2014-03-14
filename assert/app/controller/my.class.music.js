define('my.class.music',function(){
  var musicDB = this.need('your.class.music');
  return function(){
    this.inject(musicDB);
  };
});
