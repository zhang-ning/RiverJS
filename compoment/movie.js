'use strict';
(function(r){
  var bodyDOM = r('body');
  var coverDOM = r('.overlaypanelscreen');
  var playDOM = r('.play-btn');
  var movieDOM = r('.moviepanel');
  

  bodyDOM.on('click','.close-btn',function(e){
    stop();
  });
  coverDOM.bind('click',function(){
    stop();
  })
  playDOM.bind('click',function(){
    start();
  })

  

  function start(){
    /*
    if(!movieDOM){
      River.http.get('/assets/js/view/moviepanel.html').done(function(xhr){
       movieDOM = River.compail(xhr.responseText);
       bodyDOM.append(movieDOM);
       movieDOM.style('display','block').addClass('on');
      });
    }*/
    movieDOM.style('display','block').addClass('movie-on');
    coverDOM.style('display','block').removeClass('off');
  }


  function stop(){
    movieDOM.removeClass('movie-on');
    coverDOM.addClass('off');
    setTimeout(function() {
      movieDOM.style('display','none');
      coverDOM.style('display','none');
    }, 600);
  }

})(River);