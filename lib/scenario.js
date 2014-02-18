define('river.scenario',function(){

  var tools = this.need('river.core.tools');

  /**
   * this function is for trigger browser default behavior,
   * and it will be usefule , when you do the unite test , or e2e test
   * in the future
   */
  function _trigger (type,element){
    //to-do , cross IE < 9
    var event = document.createEvent('MouseEvents');
    event.initEvent(type,true,true);
    element.dispatchEvent(event);
  }

  function _keyboard (type, keycode, element){
    //to-do , cross IE < 9
    var event = document.createEvent('KeyEvents');
    event.initKeyEvent (type, true, true, null, 
                        false, false, false, false, 
                        keycode, 0); 
    element.dispatchEvent(event);
  }

  return {
    trigger:_trigger,
    key:_keyboard
  };
});
