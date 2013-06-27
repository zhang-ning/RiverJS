'use strict';

/* home */

(function(r){

    r.compoment('galary',function(){

      var lastLeft , lastCenter , lastRight , leftOut, rightOut;

      if( this.length >= 3 ){
        _byIndex.call(this,0);
      };


      var __this = this ;

      function _byIndex (i){
        lastCenter = this[i].attr('class','item transition gl-center');
        lastLeft =  lastCenter.previous().attr('class','item transition gl-left');
        leftOut = lastLeft.previous().attr('class','item transition gl-l-out');
        lastRight = lastCenter.next().attr('class','item transition gl-right');
        rightOut = lastRight.next().attr('class','item transition gl-r-out');
      }

      function _previous () {
        _byIndex.call(__this,lastCenter.previous().index);
        return lastCenter.index;
      };

      function _next () {
        _byIndex.call(__this,lastCenter.next().index);
        return lastCenter.index;
      };


      return {
        previous : _previous,
        next : _next,
        getByIndex : function(i){
          _byIndex.call(__this,i);
        }
      }
    });


    var galary = r.selectAll('.galary .item').galary();

    r('.gl-prev').bind('click', function(){
      River.funnel.call(galary.previous);
    });

    r('.gl-next').bind('click', function(){
      River.funnel.call(galary.next);
    });
    
})(River);