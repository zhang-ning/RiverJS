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

  function _keyboard (type, keycode,charCode, element){
    //to-do , cross IE < 9
    var evt = document.createEvent('Events');
    evt.initEvent(type, true, true);
    evt.view = null;
    evt.altKey = false;
    evt.ctrlKey = false;
    evt.shiftKey = false;
    evt.metaKey = false;
    evt.keyCode = keycode;
    evt.charCode = charCode;

    element.dispatchEvent(evt);
  }

  return {
    trigger:_trigger,
    key:_keyboard
  };
});
