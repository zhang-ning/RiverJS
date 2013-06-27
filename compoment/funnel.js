'use strict';

/* home */

(function(r){

    var mork,gap;
    r.funnel = function(){

      if('function' === typeof this){

        var now = (new Date).getTime();
        if(mork){
          gap = now - mork ;
        }

        //the time gap less then 500ms will not execute.
        if(gap > 600){
          this.call(this);
          mork = now;
        }

        //the first time execute.
        if(!mork){
          this.call(this);
          mork = now;
        }

      }
    }
    
})(River);